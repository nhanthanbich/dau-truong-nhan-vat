# CODEX → Bolt handoff

## A. Core và test đã chốt

- Shared Combat Engine: `src/engine/`. Entry points: `batDauTran`, `resolveTurn`, `resolveTimeout`, `resolveAndAutoAdvance`; 19 building blocks tại `REGISTRY_19`.
- Local Runtime: `src/runtime/local-runtime.ts`; Dev Sandbox: `src/runtime/dev-sandbox-runtime.ts`. Cả hai gọi cùng Engine. Chưa có Online Runtime/PostgreSQL adapter; PostgreSQL không chứa combat logic.
- Combat snapshot skill/passive/stats/content version lúc bắt đầu trận; resolve không đọc live content. AI chọn action, Engine resolve.
- A1: PvE luôn `TU_DO`; tier nhân HP/ATK/DEF. B1: CC khóa mới khi target đang có CC khóa bị bỏ qua `DANG_MANG_CC`; không refresh/cộng dồn, không diminishing returns. Seeded PRNG, MP/cost/cooldown, effect, ATB, log, victory/draw dùng Shared Engine.
- Kiểm tra cuối: `npm.cmd test` — 43/43 pass; `npm.cmd run build` — TypeScript + Vite pass; `node tests/browser-smoke.mjs` — pass, không có browser exception. Smoke bao gồm player save/reload/PvE/gacha và DEV flow.

## B. Core không được tự ý đổi

- Combat formula/rules, A1/B1, deterministic RNG, Shared Engine architecture, snapshot semantics, 19-effect registry, `so_luot` và Engine validation.
- Không thêm combat logic vào UI/Runtime/PostgreSQL. Mọi action vẫn phải đi qua Shared Combat Engine.
- Không đổi acceptance rule Owner đã chốt. Nếu cần sửa Core, báo Owner/Tech Lead trước.

## C. Dev Workbench hiện có và việc Bolt tiếp tục

- Mở trong Vite dev bằng `?dev=1`; đây là DEV LOCAL, không phải hệ thống xác thực hay phân quyền production.
- Skill Builder: chọn Hero, sửa stats/skill/passive, tạo skill draft, composition/sắp xếp nhiều effect, cấu hình target/parameter, MP cost/cooldown, passive trigger/điều kiện; preview, validate, lưu `DEV_DRAFT`. Runtime dùng content mới cho trận mới; trận đang chạy giữ snapshot.
- Guardrails: RED chặn lỗi theo Engine contract; YELLOW là heuristic cảnh báo balance, vẫn lưu/test được; GREEN không xác nhận cân bằng.
- Battle Sandbox: dựng đội 1–3, chọn 1–4 skill/actor, tier override theo trận, initial state, seed, step/AI/reset/rerun, xem snapshot/state/log. Tier override không sửa roster/content tier.
- Gacha Lab: chạy package 10 theo nhiều seed, seeded PRNG, xem kết quả. Dev Wallet/progression test hỗ trợ +10/+100/set/reset, mô phỏng first-clear/replay và unlock.
- Dev Wallet lưu riêng ở localStorage key `dtnv-dev-progression-lab-v1`; gacha test không claim player initial pack. Browser smoke xác nhận các thao tác này không sửa player IndexedDB save.
- Bolt tiếp tục: hoàn thiện UX mobile/game feel, điều kiện/validation sâu hơn nếu Owner quyết định, authorization thật trước khi có production Admin, các flow player và migration. Chưa có Online Runtime.

## D. Roster Owner đã chốt — 23 Hero

- SSS: Lạc Long Quân, Âu Cơ, Sơn Tinh, Thủy Tinh.
- SS: Thánh Gióng, Thạch Sanh, Chử Đồng Tử.
- S: An Dương Vương, Hùng Vương, Tấm, Chú Cuội, Cóc, Ông Táo.
- A: Mỵ Châu, Trọng Thủy, Tiên Dung, Sọ Dừa, Mai An Tiêm, Lang Liêu, Anh Khoai.
- B: Cậu Bé Thông Minh, Trạng Quỳnh, Nàng Tô Thị.

Không tự đổi roster/tier.

## E. Chất lượng content chưa được chứng minh bằng test

- Test pass không đồng nghĩa gameplay hay hoặc balance đúng. 23 Hero cần identity, role, strengths/weaknesses và kit khác nhau; không dùng template đổi tên hay random stat để né trùng.
- Placeholder không phải content chính thức. Hình ảnh vẫn là placeholder; YELLOW guardrails không thay thế review/balance thủ công.

## F. Ưu tiên

1. Không phá Core; tuân Owner.
2. Dev Mode no-code để Owner tự tạo/test skill qua registry hiện có.
3. Gameplay rõ, 23 Hero có bản sắc.
4. UI giống game mobile, player flow ổn định.
5. Test/build/browser smoke pass và kiểm tra hành vi thực tế.
