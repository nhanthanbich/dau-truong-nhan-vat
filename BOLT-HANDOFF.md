# Bàn giao Đấu Trường Nhân Vật

## Nguồn quyết định

- Đặc tả gameplay/kiến trúc: `DAC-TA-GAME-DAU-TRUONG-NHAN-VAT-v2_4_0-FINAL.md`.
- Quyết định CONTENT mới nhất của GAME OWNER thay roster/content cũ khi có xung đột.
- A1: PvE luôn `TU_DO`; hệ số tier chỉ áp dụng HP/ATK/DEF.
- B1: CC khóa mới bị bỏ qua với `DANG_MANG_CC` nếu actor đang mang CC khóa; không refresh, cộng dồn hoặc diminishing returns.

## Kiến trúc hiện hành

- Shared Combat Engine thuần TypeScript tại `src/engine`; UI không tính combat.
- Local Runtime và save IndexedDB atomic tại `src/runtime`.
- Dev Local/Admin và Sandbox gọi Local Runtime hoặc Shared Combat Engine; sandbox không đọc/ghi save người chơi.
- Trận đang chạy giữ combat content snapshot và content version; trận mới nhận content hiện hành.
- Player flow không còn tạo nhân vật custom. Năng lực tổng quát của engine vẫn được giữ.

## Content hiện hành

- Chính xác 23 nhân vật: 19 Hero preset B–SS và 4 Linh Thần SSS.
- Gacha ban đầu: 10 kết quả từ pool 19 Hero, weighted sampling không hoàn lại, B=60/A=30/S=9/SS=1; bảo đảm ít nhất một S/SS và một A/S/SS. Linh Thần SSS không nằm trong pool.
- Hero thường có `la_hero_preset=true`; bốn Linh Thần dùng loại `LINH_THAN`, tier SSS và kit riêng.
- Mỗi nhân vật có sáu skill và một passive. Effect chỉ dùng registry đóng 19 loại; content hiện hành mang trạng thái `CONTENT_OFFICIAL`.
- Baseline stat theo archetype ở `src/content/demo-content.ts`. Tier multiplier do Shared Combat Engine áp dụng; SPD/MP/MP Regen không nhân tier.
- Hình ảnh được đánh dấu `PLACEHOLDER_ART`, tách khỏi trạng thái kit/stat chính thức.
- Dev Local chỉnh sửa tạo `DEV_DRAFT`; không ghi đè content production hoặc save người chơi.

## Runtime và xác minh

- Store migration v1 → v2 remap nhân vật còn trong roster; nhân vật đã bỏ khỏi roster được loại khỏi save. Active/last match snapshot được giữ nguyên.
- `npm.cmd test`: 39 tests hiện hành.
- `npm.cmd run build`: TypeScript và Vite production build.
- `node tests/browser-smoke.mjs`: player gacha, roster, PvE first-clear/reload, Dev Local/Sandbox và viewport mobile.

Không thay đổi công thức combat hoặc tạo engine thứ hai. Mọi bổ sung content phải qua validation của engine.
