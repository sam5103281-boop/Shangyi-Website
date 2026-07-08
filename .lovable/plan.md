Goal: add a backstage layout editor to the `/education/device/compression-sock-faq` page so the user can drag and resize the third FAQ block’s text/image ratio and the two sock-image widths, then copy the final values to apply them permanently.

What will be built

1. Editor activation
   - Triggered by URL query param `?edit=layout` (or a localStorage flag). When active, the page renders a small floating "排版編輯" toolbar.
   - In normal mode the page looks exactly as it does now; visitors never see the editor.

2. Resizable third FAQ block (desktop only)
   - Wrap the text column and image column in a `ResizablePanelGroup` (horizontal).
   - Default sizes match the current `1fr` / `1.5fr` ratio.
   - A drag handle appears between the text and the images so the user can change the text vs. image width.

3. Resizable two sock images
   - Inside the image column, wrap the two sock images in a second `ResizablePanelGroup` (horizontal).
   - Default sizes give the long white image and the short black image equal visual weight.
   - A drag handle between the two images lets the user adjust their relative widths directly.
   - Both images keep `object-contain` so they remain fully visible while resizing.

4. Toolbar / controls
   - Floating panel shows current panel percentages (e.g. text 40% / images 60%, white 70% / black 30%).
   - "Reset" button returns to defaults.
   - "Copy values" button copies the current layout as ready-to-use Tailwind class values, so the user can paste them to us to update the source code.

5. Persistence
   - Panel sizes are saved to `localStorage` under `compression-sock-faq-layout` while the editor is active.
   - Normal mode ignores the stored values; only the editor preview uses them.

6. Mobile behavior
   - The editor UI is hidden on small screens; the mobile layout stays as a stacked, equal-height column.
   - If the user later needs mobile editing, we can add a vertical panel group in a follow-up.

Files to change

- `src/routes/education.device.compression-sock-faq.tsx` — add editor state, conditional resizable panels, and the floating toolbar.
- No new dependencies needed (`react-resizable-panels` is already in the project).
- No backend or database changes.

Out of scope

- Visitor-facing layout toggles.
- Persisting the chosen layout to the database or CMS; values are only stored locally for preview and then copied to code.

Next step

Approve this plan and I will implement the editor.