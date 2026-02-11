# Inspirations & uploads – what’s reliable and what isn’t

## When Cloudinary is configured (your setup)

### What is guaranteed / fixed

1. **No overwrites**  
   Every upload gets a unique `public_id` (`upload_<timestamp>_<random>`). The second upload can never replace the first in Cloudinary.

2. **All assets in the list**  
   Listing uses Cloudinary’s `next_cursor` until there are no more pages. You don’t miss assets because of pagination.

3. **Single source of truth**  
   The Inspirations list is always built from Cloudinary (folder `highrise-ai/inspirations`). Same result on tab switch, hard refresh, and across server instances.

4. **Resilient listing**  
   If the Cloudinary list API fails or errors mid-pagination:
   - We log the error and return whatever we got (or an empty array).
   - The API still returns 200 and merges with the static seed, so the Inspirations tab still loads (at least seed cards).

5. **Leaderboard**  
   Built from the same Cloudinary list + static seed (karma summed by email). If the list is correct, the leaderboard is correct.

### What can still go wrong (outside our code)

| Case | What happens | Mitigation |
|------|----------------|------------|
| Cloudinary API down or slow | Upload can fail (user sees error). List can be empty or slow. | Retry upload; list will show seed + any cached/session data. |
| Cloudinary rate limits | Upload or list may get 429. | User sees error; retry later. |
| Very large context (huge title/description) | Cloudinary context limits could be hit. | Keep titles/descriptions reasonable in length. |
| Wrong or missing env vars | Upload/list fails. | Ensure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are set where the app runs. |

### Edge cases that are handled

- **List API error** → We catch, log, return partial or empty list; static seed still shows.
- **One of image vs video list fails** → We catch each call; the other list still returns.
- **Pagination page fails** → We catch in the loop and return assets we already fetched.

---

## Summary

For normal use (Cloudinary configured, env set, no Cloudinary outage):

- Upload works and each upload is a new asset.
- All uploaded cards show in the Inspirations tab and persist across tab switch and hard refresh.
- Leaderboard reflects Cloudinary uploads + static seed.

The remaining failure modes are Cloudinary availability, rate limits, or configuration, not “second upload overwriting the first” or “list missing assets” in normal conditions.
