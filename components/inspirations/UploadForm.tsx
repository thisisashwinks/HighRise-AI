'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Sparkles, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { Select } from '@/components/Select';
import { CreatableSelect } from './CreatableSelect';
import { Button } from '@/components/Button';
import { UploadFormData, Role, MediaType } from '@/types/upload';

const ROLE_OPTIONS: Array<{ label: string; value: Role }> = [
  { label: 'Design', value: 'Design' },
  { label: 'PM', value: 'PM' },
  { label: 'Dev', value: 'Dev' },
  { label: 'QA', value: 'QA' },
  { label: 'Executive', value: 'Executive' },
  { label: 'Other', value: 'Other' },
];

const PRODUCT_OPTIONS = [
  { label: 'High Level', value: 'High Level' },
  { label: 'Others', value: 'Others' },
];

// Load sub-products from localStorage
const loadSubProducts = (productType: 'High Level' | 'Others'): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(`subProducts:${productType}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save sub-product to localStorage
const saveSubProduct = (productType: 'High Level' | 'Others', subProduct: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const existing = loadSubProducts(productType);
    if (!existing.includes(subProduct)) {
      const updated = [...existing, subProduct];
      localStorage.setItem(`subProducts:${productType}`, JSON.stringify(updated));
    }
  } catch {
    // Ignore errors
  }
};

interface UploadFormProps {
  onSubmit: (data: UploadFormData) => Promise<{ success: boolean; uploadId?: string; error?: string }>;
  onCancel?: () => void;
  initialData?: Partial<UploadFormData>;
}

export const UploadForm: React.FC<UploadFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<UploadFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    product: initialData?.product || 'High Level',
    subProduct: initialData?.subProduct || '',
    role: initialData?.role || 'Design',
    title: initialData?.title || '',
    description: initialData?.description || '',
  });
  
  const [file, setFile] = useState<File | null>(initialData?.file || null);
  const [linkUrl, setLinkUrl] = useState<string>(initialData?.linkUrl || '');
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aiAvailable, setAiAvailable] = useState(false);
  const [subProductOptions, setSubProductOptions] = useState<Array<{ label: string; value: string }>>([]);

  // Load sub-product options based on selected product
  useEffect(() => {
    const options = loadSubProducts(formData.product).map(sp => ({
      label: sp,
      value: sp,
    }));
    setSubProductOptions(options);
  }, [formData.product]);

  // Check if AI is available
  useEffect(() => {
    fetch('/api/features/status')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAiAvailable(data.flags.aiGeneration.enabled);
        }
      })
      .catch(() => setAiAvailable(false));
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('uploadFormData');
    if (saved && !initialData) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [initialData]);

  // Save to localStorage on change
  useEffect(() => {
    if (formData.name && formData.email) {
      localStorage.setItem('uploadFormData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        product: formData.product,
        subProduct: formData.subProduct,
        role: formData.role,
      }));
    }
  }, [formData.name, formData.email, formData.product, formData.subProduct, formData.role]);

  const handleAddSubProduct = (newSubProduct: string) => {
    saveSubProduct(formData.product, newSubProduct);
    const options = loadSubProducts(formData.product).map(sp => ({
      label: sp,
      value: sp,
    }));
    setSubProductOptions(options);
  };

  const validateFileClient = (file: File): { valid: boolean; error?: string } => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`
      };
    }

    const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
    
    if (!isValidImage && !isValidVideo) {
      return {
        valid: false,
        error: 'Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, QuickTime) are allowed.'
      };
    }

    return { valid: true };
  };

  const handleFileSelect = (selectedFile: File) => {
    const validation = validateFileClient(selectedFile);
    if (!validation.valid) {
      setErrors({ file: validation.error || 'Invalid file' });
      return;
    }

    setFile(selectedFile);
    setLinkUrl('');
    setMediaType(selectedFile.type.startsWith('video/') ? 'video' : selectedFile.type === 'image/gif' ? 'gif' : 'image');
    setErrors({});
    
    // Create preview
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleLinkChange = (url: string) => {
    setLinkUrl(url);
    setFile(null);
    setPreviewUrl(null);
    setMediaType('link');
    setErrors({});
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleGenerateAI = async () => {
    if (!aiAvailable) return;
    
    setIsGeneratingAI(true);
    setErrors({});

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      if (linkUrl) {
        formData.append('linkUrl', linkUrl);
      }
      formData.append('type', 'both');

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        if (data.title) {
          setFormData(prev => ({ ...prev, title: data.title }));
        }
        if (data.description) {
          setFormData(prev => ({ ...prev, description: data.description }));
        }
      } else {
        setErrors({ ai: data.error || 'AI generation failed. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ ai: error.message || 'AI generation failed. Please try again.' });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation - must be @gohighlevel.com
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.endsWith('@gohighlevel.com')) {
      newErrors.email = 'Email must be a HighLevel email (@gohighlevel.com)';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.subProduct.trim()) {
      newErrors.subProduct = 'Product area is required';
    }

    if (!file && !linkUrl) {
      newErrors.file = 'Please upload a file or provide a link';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setErrors({});

    try {
      // Combine product and subProduct for the API
      const productValue = formData.subProduct 
        ? `${formData.product} - ${formData.subProduct}`
        : formData.product;

      const result = await onSubmit({
        ...formData,
        product: productValue as 'High Level' | 'Others', // Combined value for API
        file: file || undefined,
        linkUrl: linkUrl || undefined,
      });

      if (result.success) {
        // Clear form
        setFile(null);
        setLinkUrl('');
        setPreviewUrl(null);
        setMediaType(null);
        setFormData({
          name: formData.name,
          email: formData.email,
          product: formData.product,
          subProduct: '',
          role: formData.role,
          title: '',
          description: '',
        });
      } else {
        setErrors({ submit: result.error || 'Upload failed. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Left - Upload Media, Right - Title, Description, Product */}
      <div className="pb-6 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Content Details</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Upload Media */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Upload Media <span className="text-red-500">*</span>
            </label>
          
          {!file && !linkUrl && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors
                ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-neutral-400'}
                ${errors.file ? 'border-red-500' : ''}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-700 mb-2">
                Drag & drop screenshots, videos, or GIFs here
              </p>
              <p className="text-sm text-neutral-500 mb-4">
                or click to choose files
              </p>
              <p className="text-xs text-neutral-400">
                Supported: JPEG, PNG, GIF, WebP, MP4, WebM (max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}

          {previewUrl && file && (
            <div className="relative border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
              {mediaType === 'image' || mediaType === 'gif' ? (
                <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-64 object-contain" />
              ) : (
                <video src={previewUrl} controls className="w-full h-auto max-h-64" />
              )}
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                  setMediaType(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-2 bg-white border-t border-neutral-200">
                <p className="text-sm text-neutral-600">{file.name}</p>
                <p className="text-xs text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}

          {linkUrl && (
            <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
              <div className="flex items-start gap-3">
                <LinkIcon className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => handleLinkChange(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLinkUrl('');
                    setMediaType(null);
                  }}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {!file && !linkUrl && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => {
                  const url = prompt('Enter a link URL:');
                  if (url) handleLinkChange(url);
                }}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <LinkIcon className="w-4 h-4" />
                Or paste a link instead
              </button>
            </div>
          )}

            {errors.file && (
              <p className="text-sm text-red-500 mt-1">{errors.file}</p>
            )}
          </div>

          {/* Right Side - Title and Description */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-neutral-900">
                  Title <span className="text-red-500">*</span>
                </label>
                {aiAvailable && (file || linkUrl) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI || !file && !linkUrl}
                    leadingIcon={isGeneratingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  >
                    {isGeneratingAI ? 'Generating...' : 'Generate with AI'}
                  </Button>
                )}
              </div>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                error={!!errors.title}
                errorMessage={errors.title}
                placeholder="e.g., Search Bar with Autocomplete"
                required
                fullWidth
              />
              {errors.ai && (
                <p className="text-sm text-red-500 mt-1">{errors.ai}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-neutral-900">
                  Description
                </label>
                {aiAvailable && file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      if (!file) return;
                      setIsGeneratingAI(true);
                      try {
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('type', 'description');

                        const response = await fetch('/api/ai/generate', {
                          method: 'POST',
                          body: formData,
                        });

                        const data = await response.json();

                        if (data.success && data.description) {
                          setFormData(prev => ({ ...prev, description: data.description }));
                        } else {
                          setErrors({ ai: data.error || 'AI generation failed' });
                        }
                      } catch (error: any) {
                        setErrors({ ai: error.message || 'AI generation failed' });
                      } finally {
                        setIsGeneratingAI(false);
                      }
                    }}
                    disabled={isGeneratingAI || !file}
                    leadingIcon={isGeneratingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  >
                    {isGeneratingAI ? 'Generating...' : 'Generate with AI'}
                  </Button>
                )}
              </div>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                error={!!errors.description}
                errorMessage={errors.description}
                placeholder="Describe the component or pattern shown..."
                maxLength={500}
                showCharacterCount
                fullWidth
                minRows={3}
              />
            </div>
          </div>
        </div>

        {/* Product and Product Area - Full width, side by side */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Product"
            options={PRODUCT_OPTIONS}
            value={formData.product}
            onChange={(value) => {
              setFormData(prev => ({ 
                ...prev, 
                product: value as 'High Level' | 'Others',
                subProduct: '' // Reset sub-product when product changes
              }));
            }}
            helperText="It could also be from a product outside of High Level"
            fullWidth
          />

          {/* Sub-Product Area (shown when product is selected) */}
          {formData.product && (
            <CreatableSelect
              label="Product Area"
              value={formData.subProduct}
              onChange={(value) => setFormData(prev => ({ ...prev, subProduct: value }))}
              options={subProductOptions}
              onAddOption={handleAddSubProduct}
              placeholder={`Select or create a ${formData.product === 'High Level' ? 'High Level' : 'product'} area`}
              error={!!errors.subProduct}
              errorMessage={errors.subProduct}
              fullWidth
              required
            />
          )}
        </div>
      </div>

      {/* Section 2: Your Name, Your Email, Your Role */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-900">Your Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Your name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            error={!!errors.name}
            errorMessage={errors.name}
            required
            fullWidth
          />
          
          <Input
            label="Your email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            error={!!errors.email}
            errorMessage={errors.email}
            helperText="Only collected for trust and verification purposes"
            required
            fullWidth
          />
        </div>

        <Select
          label="Your role"
          options={ROLE_OPTIONS}
          value={formData.role}
          onChange={(value) => setFormData(prev => ({ ...prev, role: value as Role }))}
          fullWidth
        />
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            theme="neutral"
            onClick={onCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          theme="primary"
          disabled={isUploading}
          leadingIcon={isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </form>
  );
};
