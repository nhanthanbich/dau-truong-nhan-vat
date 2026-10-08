# ĐẶC TẢ GAME ĐẤU TRƯỜNG NHÂN VẬT

**Phiên bản:** v2.4.0 — **Content/Gacha Pass: bổ sung roster Hero Việt Nam B→SS + Triệu Hồi Khởi Đầu miễn phí + mở khóa trực tiếp bằng Hương Hỏa.** Đối chiếu phản biện: bước nhảy SS→SSS cộng dồn kiểu nhân với Stat Allocation khiến +30% tier thực tế thành +45,6% — làm mượt lại toàn bộ đường cong (B→SSS giảm còn +22%, tổng cộng dồn ≈+36,6%), giữ `SS→SSS` là bước nhảy lớn nhất ladder nhưng không còn đột biến. Quan trọng hơn con số: **Layer 2 (kit riêng của Linh Thần) chuyển từ khuyến nghị mềm sang điều kiện PASS/FAIL bắt buộc** — mỗi Linh Thần phải có ít nhất 1 đặc điểm skill/Nội tại được tác giả gắn cờ `dac_trung_rieng=true`, Dev Mode từ chối publish nếu thiếu. Bổ sung một lớp progression nội dung hữu hạn: Triệu Hồi Khởi Đầu miễn phí 1 lần và kho Hero preset Việt Nam B→SS; không có tiền thật, không có banner quay vô hạn, không có pity mua bằng tiền. Không đổi Shared Combat Engine/schema combat lõi/RNG/transaction/Realtime.

### v2.4.0 — Hero Việt Nam + Triệu Hồi Khởi Đầu + Hương Hỏa mở Hero

135. **Mở rộng roster nội dung**: thêm **20 Hero preset** lấy từ cổ tích/truyền thuyết dân gian Việt Nam, trải đều `B/A/S/SS` (mỗi tier 5 Hero). Đây là Class `THUONG` đã được tác giả hoá sẵn, không thay thế cơ chế tạo nhân vật tự do; mỗi Hero có Class riêng, 1 passive và tối thiểu 6 skill như mọi Class `THUONG`.
136. **Thêm Triệu Hồi Khởi Đầu**: mỗi `nguoi_choi_local` được **1 gói miễn phí duy nhất gồm 10 lượt**. Pool chỉ gồm 20 Hero preset B→SS; không tạo nhân vật tự do, không dùng Hương Hỏa, không dùng tiền thật. Có **1 kết quả bảo đảm S trở lên** và **1 kết quả bảo đảm A trở lên** trong 10 lượt. Kết quả không trùng Hero đã nhận trong cùng gói; toàn bộ gói chỉ được nhận một lần, không reroll/refresh/banner.
137. **Tách rõ 2 trải nghiệm**: (a) `Tạo nhân vật mới` vẫn miễn phí, không giới hạn, roll tier `{B,A,S}` như v2.3.0; (b) `Triệu Hồi Khởi Đầu` là gói Hero preset miễn phí, chỉ nhằm tạo roster ban đầu và cảm giác khám phá. Gacha không thay thế hệ thống tạo nhân vật tự do.
138. **Thêm mở khóa Hero bằng Hương Hỏa**: B=`15`, A=`30`, S=`50`, SS=`80`. Đây là **direct-choice**, không random; Hero đã nhận từ gacha không thể mua lại. Hương Hỏa vẫn chỉ có nguồn PvE first-clear; 300 Hương Hỏa MVP không bị tăng thêm. Vì chi phí Hero thấp hơn SSS=300, người chơi có thể dùng Hương Hỏa để bổ sung roster trước/sau khi thỉnh Linh Thần — đây là lựa chọn sản phẩm có chủ đích, không phải nguồn Hương Hỏa mới.
139. **Giữ nguyên Linh Thần SSS**: 4 Linh Thần vẫn là Sơn Tinh, Thạch Sanh, Thánh Gióng, Chử Đồng Tử; vẫn mở trực tiếp bằng 300 Hương Hỏa; không đưa SSS vào gacha khởi đầu.
140. **Bổ sung schema/config/acceptance/migration** cho trạng thái đã nhận gói gacha và danh sách Hero preset; không đổi Shared Combat Engine, 19 effect, ATB, RNG combat, transaction/realtime, PvP authority hay luật SSS Layer 1/2.
141. **Gacha là economy nội dung hữu hạn**: không có `shop`, không có `premium_currency`, không có mua lượt, không có daily/weekly/login reward, không có duplicate→currency, không có pity có thể farm. RNG gacha khởi đầu dùng RNG ngoài combat; kết quả phải được lưu nguyên tử để reload/crash không cấp lần hai.

## CHANGELOG

### v2.3.0 — Balance Audit: đường cong Tier mượt hơn + Layer 2 bắt buộc

129. **Làm mượt lại đường cong Tier** (mục 0.8.4.B, ADR-09): `C=0.94, B=1.00, A=1.04, S=1.08, SS=1.13, SSS=1.22` (trước: `0.92/1.00/1.05/1.10/1.16/1.30`). Lý do: hệ số tier nhân (không cộng) với Stat Allocation trong công thức `tinh_chi_so_cuoi` — bước nhảy +30% của v2.2.0 cộng dồn với +12% Stat Allocation tối đa ra tới +45,6% thực tế, lớn hơn hẳn con số hiển thị trên bảng. Sau khi sửa: B→SSS còn +22% thuần tier, cộng dồn tối đa ≈+36,6%. `SS→SSS` (+9 điểm %) vẫn là bước nhảy lớn nhất ladder (gần gấp đôi bước kế trước, +4 đến +6), nên SSS vẫn rõ ràng là tier cao nhất.
130. **Layer 2 từ khuyến nghị thành acceptance contract bắt buộc** (mục 0.8.4.G): thêm cột `dac_trung_rieng boolean` vào `ky_nang` và `noi_tai_class` (mục 0.7.4/0.7.6); mỗi Class `LINH_THAN` phải có ≥1 phần tử gắn cờ `true`; Dev Mode (mục 3.4/3.5) **từ chối publish** (hard block) một Linh Thần không có đặc trưng nào được đánh dấu. Ngân sách tham số +20-30% vẫn chỉ là hướng dẫn cân bằng (`PLAYTEST-VERIFIABLE`), không phải CHECK.
131. **Cập nhật bảng 4 Linh Thần minh hoạ** (mục 1.7) với cột chỉ rõ đặc điểm nào đạt điều kiện `dac_trung_rieng` của từng vị.
132. **Thêm 6 acceptance test mới** (mục 0.15): hard block khi thiếu `dac_trung_rieng`, 4 Linh Thần seed đều có cờ, bảng hệ số khớp đúng số mới, bước nhảy không bất thường.
133. **Lịch sử v2.3.0:** đề xuất thay toàn bộ luồng tạo nhân vật bằng gacha đã từng bị từ chối. v2.4.0 **không làm điều đó**: luồng tạo nhân vật tự do vẫn tồn tại; gacha chỉ là một gói Hero preset miễn phí, 1 lần, để mở roster ban đầu.
134. **Không đổi**: Shared Combat Engine, ATB/target/effect/CC/victory, RNG contract, Content Bundle, transaction/Realtime, Dev Mode (ngoài hard block mới), 19 hiệu ứng, action pipeline, Stat Allocation, pool roll `{B,A,S}`, 4 Linh Thần, Hương Hỏa 300=1 SSS, `CAN_BANG`/`TU_DO`.

### v2.2.0 — Tier Ladder 6 bậc + Economy chỉ còn First-Clear

122. **Mở rộng tier ladder** từ `{B,A,S,SSS}` sang **`{C,B,A,S,SS,SSS}`** (mục 0.8.4.B, ADR-09). `C`/`SS` không roll được cho nhân vật người chơi (vẫn chỉ `{B,A,S}`, không đổi product decision) — dùng làm núm chỉnh độ khó AI theo màn (`doi_ai.tier`, mục 0.7.12), tránh enum chết.
123. **Hệ số tier đổi thành** `C=0.92, B=1.00, A=1.05, S=1.10, SS=1.16, SSS=1.30` (mục 0.7.13b/0.8.4.B) — bước nhảy `SS→SSS` (+14 điểm %) lớn hơn rõ rệt mọi bước nhảy khác, đóng yêu cầu "SSS phải khác biệt rõ rệt, không phải multiplier nhỏ". Toàn bộ số trong bảng này là ⚠️ `PLAYTEST-VERIFIABLE — BALANCE SEED`, không phải invariant kiến trúc.
124. **Thêm Layer 2 (mục 0.8.4.G)**: Linh Thần được seed với ngân sách tham số hiệu ứng cao hơn Class thường (~20-30%, khuyến nghị mềm) và khuyến khích thiết kế kit đa effect hơn trong 1 skill — dùng đúng registry/schema hiện có, không thêm effect/trigger/mechanic mới, không bypass Shared Combat Engine.
125. **Chuẩn hoá wording `CAN_BANG`** (mục 0.7.11, ADR-08): nói chính xác "vô hiệu các hệ số stat do tier mang lại" thay vì "vô hiệu Linh Thần" — Nội tại/skill/kit riêng (Layer 2) luôn giữ nguyên ở mọi phòng, kể cả `CAN_BANG`.
126. **Bỏ hẳn "mục tiêu phụ"** (schema `man_choi.muc_tieu_phu`, `tien_do_di_ai.muc_tieu_da_nhan`, logic cấp thưởng liên quan) khỏi economy Hương Hỏa — chỉ còn đúng 1 nguồn (first-clear), đúng 1 invariant (`INV-PVE-1`, mục 0.8.6.E), tổng MVP giảm từ 600 xuống **300**, đúng bằng `chi_phi_linh_than`. Q10 (4.4d) cập nhật: Linh Thần thứ 2–4 **chưa có nguồn nào trong MVP** (trước đó mục tiêu phụ từng mở được SSS thứ 2).
127. **Cập nhật toàn bộ cross-reference, acceptance test, migration** theo ladder và economy mới (mục 0.15, 4.6); grep xác nhận không còn chỗ nào nói `B/A/S/SSS` (thiếu `SS`) hoặc còn nhắc "mục tiêu phụ" như một nguồn Hương Hỏa đang hoạt động.
128. **Không đổi**: Shared Combat Engine, ATB/target/effect/CC/victory, RNG contract, Content Bundle, transaction/Realtime, Dev Mode, 19 hiệu ứng, action pipeline, Stat Allocation, pool roll `{B,A,S}` của nhân vật người chơi, Bách Thần Điện (direct-choice, không gacha/Shop).

### v2.1.0 — Hương Hỏa / Tier / Linh Thần (SSS) + vá roster & danh tính PvP

110. **Re-open ADR-07, verdict `ACCEPTED`** (mục 4.4d): trả lời đủ 10 câu hỏi bắt buộc bằng số liệu thật trong file, không giả định.
111. **Thêm hệ thống Tier** (`B/A/S` roll khi tạo nhân vật, `SSS` chỉ dành cho Linh Thần) và hệ số nhân HP/ATK/DEF nền (1.00/1.03/1.06/1.10, mục 0.8.4.B) — nằm **trên** công thức Stat Allocation sẵn có, không thay công thức đó.
112. **Thêm Hương Hỏa**: nguồn duy nhất là first-clear (mục 0.8.6.C) + mục tiêu phụ (0–2/màn), mỗi mục cấp đúng 1 lần, cấp trong cùng giao dịch với `KET_THUC` (mục 0.8.6.D), `INV-PVE-1` viết lại thành First Clear Reward Invariant tổng quát (mục 0.8.6.E). Số liệu MVP: 300 (first-clear) + 300 (mục tiêu phụ) = đủ 2 Linh Thần; chi phí 1 Linh Thần = 300 (mục 0.8.6.F).
113. **Thêm Bách Thần Điện** (mục 1.4b): chọn trực tiếp, không random/gacha, không Shop generic.
114. **Sửa ADR-07 cũ thành lịch sử + ADR-07 mới, thêm ADR-08/09/10** (mục 0.1a): hosting Hương Hỏa, PvP xác thực hợp lệ không xác thực sở hữu, cơ chế Tier/SSS, danh tính PvP ẩn danh.
115. **Đổi ADR-02**: từ "hai hồ tách biệt" (v1.9.0) sang **một roster local dùng chung PvE/PvP qua bản khai nhân vật** (mục 0.7.0, 2.2) — sửa luôn lỗ hổng "roster PvP chưa từng được định nghĩa cụ thể" phát sinh khi thiết kế đường đưa Linh Thần vào PvP.
116. **Đổi `nguoi_choi` sang phiên ẩn danh** (ADR-10): bỏ `ten_dang_nhap`/`mat_khau_hash`, chỉ còn `ten_hien_thi` — sửa lỗ hổng đặc tả có cột mật khẩu nhưng chưa từng có luồng đăng ký/đăng nhập nào ở Phần 2.
117. **Thêm `phong_choi.che_do_tier` (`CAN_BANG`/`TU_DO`)**: `CAN_BANG` (mặc định) vô hiệu hệ số tier cho mọi actor (Linh Thần vẫn dùng được với kit riêng, chỉ mất phần cộng số) — người tạo phòng chọn luật trước khi chia sẻ mã phòng.
118. **Thêm mục 0.1b (Threat Model)**: xác định rõ mục tiêu bảo mật thật sự cần (đúng, không mất dữ liệu, công bằng xã hội) và cái gì chủ động không cần (chống gian lận đối kháng, bảo vệ local save, xác thực sở hữu) — vì đối tượng chơi là nhóm bạn, không phải cộng đồng công khai.
119. **Tách bạch tên gọi Class (`THUONG`, đặt tên theo hệ phái) và Linh Thần (`LINH_THAN`, đặt tên theo nhân vật cổ tích)** ở mục 1.7 — đóng ambiguity ChatGPT chỉ ra: seed ví dụ Class đổi từ tên riêng (Sơn Tinh...) sang tên hệ phái (Hệ Hộ Vệ...) để 4 tên đó dành riêng cho Linh Thần.
120. **Thêm 24 acceptance test P0** cho Hương Hỏa/Tier/PvP payload (mục 0.15); cập nhật migration (mục 4.6) cho toàn bộ cột mới; cập nhật mục 4.9 (đóng NEEDS PRODUCT DECISION #1 thành đã chốt).
121. **Không đổi**: Shared Combat Engine, ATB/target/effect/CC/victory, RNG contract, Content Bundle, transaction/Realtime, Dev Mode, 19 hiệu ứng, action pipeline.

### v2.0.1 — Anti-Farming Audit (Hương Hỏa / Bách Thần Điện)

106. **Thực hiện audit anti-farming đầy đủ (mục 4.4c)**: trả lời "CÓ" cho câu hỏi spam/Rematch farm nếu có currency gắn vào thắng PvE — với flow cụ thể dựa trên luồng Đấu lại ở mục 1.4a; đánh giá 4 phương án A–D; chỉ ra giới hạn toàn vẹn dữ liệu (local, không server authority) và vòng phản hồi sức mạnh; Economy Gate không đạt. **Verdict giữ nguyên `DO NOT ADD`, nay có bằng chứng kỹ thuật thay vì chỉ trích danh sách cấm.**
107. **Thêm `INV-PVE-1` (mục 1.4a) + 3 test (mục 0.15)**: kết quả PvE chỉ được tạo đúng một thay đổi bền vững idempotent (`da_hoan_thanh`); Rematch/replay/Next Stage không tạo phần thưởng — ngăn tính năng tương lai vô tình biến Đấu lại thành nút farm.
108. **Thêm ADR-07 (mục 0.1a)** ghi lại lý do kiến trúc (offline-first không có server authority ⇒ không có economy có trọng lượng).
109. **Không đổi**: engine, schema, RNG, transaction, Realtime, gameplay/balance, Dev Mode, các test đã có.

### v2.0.0 — Final Cross-AI Red Team (ChatGPT + Gemini) trước build

97. **Bảng Proposal Audit (đối chiếu đề xuất Gemini, mục 4.4a mới):** 4/5 đề xuất được nhận ở dạng rút gọn (UI/content, không đổi engine), 1/5 bị từ chối dứt khoát (Shop/Currency) — xem chi tiết + lý do ở mục 4.4a.
98. **Thêm yêu cầu UI: ATB phải hiển thị dạng hàng đợi lượt tường minh (Turn Order Queue)**, không phải thanh gauge mờ dần — dùng đúng field `du_bao_thu_tu` đã có từ v1.3 (mục 1.5.0). Lý do: cả ChatGPT và Gemini độc lập chỉ ra cùng một rủi ro ("ATB cảm giác random nếu chỉ hiện số/thanh chạy").
99. **Thêm yêu cầu UI: phân nhóm hiệu ứng theo 3 cụm màu** (có lợi/bất lợi/khống chế) dựa đúng trên field `nhom` đã có trong registry (mục 0.8), icon nhóm `KHONG_CHE` phải nổi bật hơn nhóm khác — giảm information overload từ 19 effect, không đổi effect registry.
100. **Thêm hướng dẫn nội dung (không phải rule engine): khuyến nghị mỗi Class có ≥1 skill `hoi_chieu_luot=0` và `chi_phi_mp=0`** (mục 1.7) — giảm tần suất rơi vào "mọi skill đang cooldown, phải tự bấm BỎ_LƯỢT" (rủi ro dead-turn mà chính mục 4.7/0.13 của bản trước đã tự nhận diện) mà **không** tạo cơ chế "đánh thường" mới — đây là cảnh báo mềm ở Dev Mode (không chặn lưu), đo lường bằng `Forced Pass Rate` đã có sẵn (mục 0.14).
101. **Thêm ví dụ seed minh hoạ theo chủ đề Cổ tích Việt Nam** (Sơn Tinh, Thạch Sanh, Thánh Gióng, Âu Cơ) vào mục 1.7 — đáp ứng đúng yêu cầu "tối thiểu 4 Class phân biệt rõ lối chơi" đã có sẵn, chỉ thay ví dụ minh hoạ chung chung bằng ví dụ có bản sắc, **không phải nội dung bắt buộc cứng** — Dev Mode toàn quyền đổi.
102. **Thêm 1 đoạn hướng dẫn triển khai (process, không phải gameplay): xây Shared Combat Engine trước ở dạng headless + golden fixtures, UI làm sau** (mục 0.2a) — chính thức hoá điều mà contract RNG/Local-Online equivalence (mục 1.5.0a) đã ngầm yêu cầu.
103. **Từ chối rõ ràng:** hệ thống Shop/Currency/mở khoá nhân vật bằng tiền tệ offline (đề xuất Gemini) — xem lý do đầy đủ ở mục 4.4a. Không patch vào spec dưới bất kỳ hình thức nào.
104. **Xác nhận không patch** (ChatGPT audit mục 3-11: Shared Combat Engine hosting, RNG/determinism, Content Bundle, snapshot no-fallback, transaction boundary, Realtime canonical-state) — toàn bộ đã được đóng đúng ở v1.8.1/v1.9.0, không tìm thấy mâu thuẫn mới, không cần sửa thêm.
105. **Xác nhận không patch** (ChatGPT audit mục 7: Dead Turn matrix) — `xac_dinh_bo_luot_tu_dong` (mục 1.5.3 bước 4.5) đã định nghĩa đầy đủ, deterministic, có acceptance test; chỉ bổ sung hướng dẫn nội dung ở mục 100 phía trên, không sửa logic.

### v1.9.1 — Player Experience Red Team: đóng gap Post-Match và Onboarding

92. **Thêm mục 1.4a — Màn hình Kết quả trận**: bộ nút Đấu lại/Màn tiếp theo/Đổi đội hình/Về Menu theo từng ngữ cảnh (PvE Đối kháng, PvE Đi ải thắng/thua, PvP), giữ nguyên đội hình vừa dùng làm mặc định. Đóng rủi ro "người chơi thắng/thua rồi không biết bấm gì tiếp" — lý do trực tiếp nhất khiến người chơi không chơi trận thứ hai.
93. **Sửa mâu thuẫn còn sót ở mục 1.4**: "Nút xác nhận bị vô hiệu nếu chưa đủ 3" mâu thuẫn với luật 1–3 actor/đội đã chốt từ patch trước — sửa lại đúng "1, 2 hoặc 3 đều hợp lệ".
94. **Thêm mục 0.5a — Onboarding tối thiểu (contextual hint)**: 5 hint ngắn xuất hiện đúng 1 lần theo sự kiện (ATB lần đầu, mở skill lần đầu, skill bị khoá, effect nhóm mới xuất hiện, trận đầu kết thúc) thay vì tutorial nhiều bước; thêm gợi ý build mặc định (Dev Mode gắn cờ `goi_y_nguoi_moi`) ở Bước 3/5 luồng tạo nhân vật. Ghi rõ mức tối thiểu chấp nhận được nếu cần cắt phạm vi.
95. **Cập nhật Future Roadmap (4.7)**: tách rõ phần đã làm ở mục 92-94 khỏi phần thực sự còn chờ playtest (Key Moment, telemetry Rematch Rate, tutorial nâng cao, rematch-với-đối-thủ-cũ).
96. **Không đổi**: Shared Combat Engine, schema DB, RNG contract, transaction/Realtime contract, gameplay/balance (1–3 actor, Stat Allocation, CC, ATB, target resolution), Dev Mode, toàn bộ acceptance test kỹ thuật đã có. Đây là patch UX/content thuần túy — không phải version bump kiến trúc.

### v1.9.0 — Final Red-Team Audit + Architecture Completion

86. **Thêm Randomness & Determinism Contract (mục 1.5.0a, ADR-04)** — gap lớn nhất tìm được: trước đây tài liệu chỉ nói "random do server sinh" mà chưa định nghĩa thuật toán/seed/thời điểm consume, khiến không thể chứng minh Local Runtime và Online Runtime cho cùng kết quả khi có `NGAU_NHIEN_N_DICH`. Chốt: PRNG thuần thuật toán (không dùng `Math.random()`), seed sinh 1 lần tại `bat_dau_tran`, `rng_seed`/`rng_state` lưu trong `trang_thai_chien_dau` (mục 1.5.1) và snapshot, log mỗi lần dùng vào `nhat_ky_luot_danh`.
87. **Chốt cụ thể Content Bundle (mục 0.6a, ADR-03):** JSON, `phien_ban_content` tăng dần, `content_hash` SHA-256 verify trước khi cache, tải khi có mạng ở Menu chính, không đổi giữa trận đang chạy — thay cho NEEDS REVIEW của v1.8.0.
88. **Phân loại lại toàn bộ mục 4.9 theo A/B/C** (đã tự chốt được / cần product decision với default rõ / ngoài phạm vi): liên kết nhân vật local↔online có default "hai hồ tách biệt, không tự động liên kết" (ADR-02) để không chặn engineering; đa thiết bị PvE xác nhận là hệ quả tất yếu của kiến trúc offline, không còn là câu hỏi mở; PvP ẩn danh xác nhận ngoài phạm vi.
89. **Thêm Architecture Decision Records (mục 0.1a)** cho 6 quyết định trọng yếu: hosting Shared Combat Engine, danh tính local/online tách biệt, Content Bundle, RNG, luật hoà đối xứng team, CC diminishing returns.
90. **Thêm acceptance test**: nhóm RNG/Determinism (seed cố định → cùng kết quả 2 runtime), test integrity Content Bundle (hash sai → giữ bundle cũ). Giữ nguyên toàn bộ test đã có ở 0.15/0.16/2.3.
91. **Không đổi**: toàn bộ gameplay/balance (1–3 actor/đội, Stat Allocation, CC, SPD, cooldown/duration, target resolution, victory), transaction semantics, Realtime contract v1.8.1, Dev Mode, schema (trừ thêm 2 field `rng_seed`/`rng_state` vào `trang_thai_chien_dau` — bổ sung cần thiết để RNG contract khả thi, không phải thay đổi tự ý).

### v1.8.1 — Chuẩn hoá host boundary của Shared Combat Engine + Realtime canonical-state contract

81. **Chuẩn hoá nơi Shared Combat Engine thực thi (đóng mơ hồ của v1.8.0, mục 0.2, 0.3, 1.5.3, Phần 2 intro):** v1.8.0 mô tả Online Runtime là "PostgreSQL function/RPC hoặc Edge Function... gọi Shared Combat Engine", gây hiểu lầm rằng PostgreSQL có thể trực tiếp host/chạy engine (không khả thi nếu engine là module application như TypeScript/JavaScript). Chốt lại: **Shared Combat Engine là một application/server module**, chạy in-process cho Local Runtime (PvE) và chạy ở tầng application/server runtime (Edge Function/backend) cho Online Runtime (PvP). **PostgreSQL chỉ chịu trách nhiệm persistence, transaction boundary, locking và atomic commit** — không chứa logic gameplay. Đã rà và sửa toàn bộ câu chữ/diagram hàm ý "PostgreSQL function/RPC trực tiếp chạy Shared Combat Engine" thành đúng kiến trúc 3 lớp: Shared Combat Engine (application module) → Local Runtime (in-process) / Online Runtime (application/server runtime + 1 DB transaction) → PostgreSQL (persistence-only).
82. **Chuẩn hoá hợp đồng Realtime canonical-state + gap-resync (mục 2.3):** mỗi event Realtime phải mang toàn bộ canonical combat state đúng với `so_luot` của event đó (không phát diff); nếu client phát hiện khoảng trống version (`so_luot` nhảy > 1 so với version đang chờ), client không tự suy diễn state mà phải resync bằng canonical snapshot từ server. Tiếp tục dùng đúng `so_luot` hiện có, **không thêm biến version mới** (`combat_version` hay tương đương).
83. **Cập nhật acceptance tests**: thêm nhóm "Online Engine Host" và "Realtime canonical-state + gap-resync" ở mục 0.15; không đổi test nào đã có ở 0.16 (đã nhất quán từ trước).
84. **Xác nhận mục 4.9 không chứa câu hỏi "Shared Combat Engine chạy ở đâu?"** — vấn đề này chưa từng được đưa vào 4.9 ở các patch trước và **không được đưa vào** ở patch này, vì đã quyết định dứt điểm ở mục #81 (không còn là NEEDS REVIEW).
85. **Không đổi**: mọi luật combat, ATB/event-based turn model, formation 1–3 actor/đội, target resolution, CC/effect semantics, cooldown/duration, timeout, bất biến tăng `so_luot`, transaction-per-mutation, auto-resolve loop sau COMMIT, content snapshot/no fallback, khái niệm Local/Online dùng chung engine, Dev Mode, toàn bộ acceptance test đã có trước patch này, scope PvE/PvP, và schema DB (trừ phần diễn giải lại ý nghĩa "RPC" ở mục 0.2 — không đổi tên cột/bảng nào).

### Final Patch v1.8.0 (2) — Offline-first PvE / Online-only PvP (không đổi version, chỉ vá kiến trúc)

73. **Tách Shared Combat Engine khỏi tầng persistence**: toàn bộ logic gameplay (ATB, target, skill, effect, passive, damage, CC, MP, cooldown, DOT/HOT, victory, trần lượt, snapshot, AI decision interface) ở mục 1.5 nay được định nghĩa là **một module logic duy nhất, không phụ thuộc Postgres/Supabase/network** — được gọi trực tiếp, in-process bởi **Local Runtime** (PvE, mục 1.x) và được bọc trong lớp network/authority bởi **Online Runtime** (PvP, mục 2.x). Không có hai bộ luật combat khác nhau; không copy-paste engine (mục 0.2, 0.3).
74. **Sửa nguyên tắc kiến trúc #2 (0.3)**: bỏ câu tuyệt đối "Xử lý lượt đánh luôn ở phía server" — nguyên tắc cũ mâu thuẫn trực tiếp với yêu cầu PvE offline. Thay bằng: Shared Combat Engine chạy local cho PvE (không gọi server); PvP bắt buộc có lớp online authority/synchronization tương đương để ngăn client tự sửa kết quả trận — client vẫn không bao giờ tự tính rồi gửi kết quả lên, dù chạy local hay online.
75. **Data model tách Local-first vs Online-only** (mục 0.7.0 mới): `nhan_vat`, `class`, `ky_nang`, `noi_tai_class`, `hieu_ung_dinh_nghia`, `ngoai_hinh_asset`, formation PvE, `tien_do_di_ai`, save PvE, Sandbox state là **Local-first** (tồn tại và hoạt động đầy đủ trên thiết bị, không bắt buộc có bản ghi server để chơi được PvE). `phong_choi`, phiên PvP, đồng bộ realtime, resolve timeout online là **Online-only**. `tran_dau`/`trang_thai_chien_dau`/`nhat_ky_luot_danh` dùng chung 1 cấu trúc dữ liệu cho cả hai runtime — chỉ khác nơi lưu (Postgres cho PvP, local storage cho PvE).
76. **Thêm khái niệm Danh tính người chơi local (`nguoi_choi_local_id`)**: PvE không yêu cầu tài khoản/đăng nhập/authentication server — sinh một UUID lưu trên thiết bị khi mở app lần đầu, dùng làm khoá sở hữu cho toàn bộ dữ liệu PvE local. Tài khoản online (`nguoi_choi`, mục 0.7.1) chỉ bắt buộc khi chơi PvP. ⚠️ **NEEDS REVIEW**: cơ chế đưa nhân vật đã tạo offline vào chơi PvP (đồng bộ `nguoi_choi_local_id` ↔ tài khoản online) **chưa được chốt** trong patch này — xem mục 4.9.
77. **Thêm Content Bundle**: Class/Skill/Nội tại/Effect registry/Ngoại hình vẫn **data-driven, tác giả hoá qua Dev Mode** như trước — nhưng để PvE offline có dữ liệu, ứng dụng đóng gói/tải về một **content bundle** (bản chụp toàn bộ nội dung `HOAT_DONG`, có `phien_ban_content`) và cache vào local storage; Local Runtime luôn đọc từ bundle đã cache, không bao giờ query online khi đang chơi PvE (mục 0.6a mới).
78. **Rà soát Dev Mode**: giữ nguyên cổng bảo mật (mục 3.1–3.2) cho việc **tác giả hoá nội dung** (ghi vào nguồn dữ liệu chính, ảnh hưởng bundle sẽ phát hành) — đây là công cụ dev/admin, không phải một bước người chơi PvE phải đi qua. **Sandbox Test (3.8) chạy Shared Combat Engine qua Local Runtime**, không ghi DB, hoạt động offline được ngay khi Dev Mode đã tải xong nội dung cần test.
79. **Thêm nhóm acceptance test Offline Architecture (OFF-01 → OFF-10)** — mục 0.16.
80. **Không đổi**: mọi con số/luật gameplay đã chốt ở các patch trước (1–3 actor/đội, Stat Allocation, CC, SPD, trần lượt, tie-break theo số lượt đã hành động, snapshot, transaction semantics cho Online Runtime/PvP) — patch này thuần kiến trúc, không rewrite gameplay.

### v1.7.0 → v1.8.0

68. **Chốt lại luật quân số: mỗi đội 1–3 actor, KHÔNG bắt buộc đúng 3.** Bản v1.8.0 trước patch này quy định sai rằng "đội người chơi luôn đúng 3 nhân vật" — đây là một giả định quá chặt so với ý định gốc của combat theo đội (đội hình linh hoạt, không phải luôn-3v3). Từ patch này: mỗi đội (người chơi lẫn AI, PvE lẫn PvP) có **tối thiểu 1, tối đa 3** actor độc lập với đội đối phương — 1v1, 1v2, 1v3, 2v1, 2v2, 2v3, 3v1, 3v2, 3v3 đều là cấu hình hợp lệ dùng chung một engine, không có "chế độ đặc biệt" cho cấu hình lệch quân số. Tổng actor một trận luôn `2 ≤ actors.length ≤ 6`. Điều kiện thắng (mục 1.5.5) không đổi và không phụ thuộc số actor ban đầu của mỗi đội — **không thêm handicap/hệ số bù trừ nào** cho đội ít quân hơn.
69. **Sửa toàn bộ chỗ hard-code "đúng 3"/"6 actor" thành khoảng 1–3 / 2–6`**: yêu cầu sở hữu nhân vật để chơi (mục 1.2, 1.6) giảm từ "≥3" xuống "≥1"; màn Chọn đội hình (mục 1.4, 2.2) đổi "chọn đúng 3" thành "chọn 1–3, không trùng nhân vật trong cùng đội hình"; `doi_hinh_nguoi_tao`/`doi_hinh_nguoi_2` (mục 0.7.11) đổi từ "mảng đúng 3 phần tử" thành "mảng 1–3 phần tử"; `bat_dau_tran` (mục 1.5.2) nhận đội hình 1–3 mỗi bên thay vì cố định 3; ATB/`thu_tu_uu_tien` (mục 1.5.0) viết lại công thức theo vị trí trong đội hình thực tế (không giả định slot 3 luôn tồn tại); acceptance test (mục 0.15, 1.8, Phần 2) thêm đủ 9 tổ hợp 1v1→3v3 cộng PvE 1–3 vs AI 1–3.
70. **Ký hiệu A1/A2/A3/B1/B2/B3 trong toàn bộ tài liệu là SLOT TỐI ĐA, không phải actor bắt buộc tồn tại** — ghi chú tường minh tại mục 1.5.0 và 1.5.1: 1v1 chỉ có A1, B1; 1v3 có A1, B1, B2, B3; không tạo actor giả để lấp slot còn thiếu, không actor "rỗng"/"NULL" nào tham gia ATB, target, snapshot, hay log.
71. **Sửa 2 chỗ dùng từ "placeholder" mô tả sai bản chất** (mục 1.2, 3.1): liên kết "Dành cho nhà phát triển" ở Phần 1 **hiển thị nhưng chức năng bị khoá cho đến khi Phần 3 được triển khai** — không phải nội dung đặc tả còn thiếu, chỉ là thứ tự build theo 3 prompt (mục 4.5).
72. **Không đổi bất kỳ hằng số gameplay nào** (5 điểm Stat Allocation, trần 2/stat, hệ số quy đổi, trần lượt liên tiếp actor=2/đội=3, gauge cap 2×, SPD clamp 50–150%, kháng CC 2 lượt, CC max duration 2, trần khiên 50% HP, action cap 150, PvP timeout, trọng số AI) — đây là final patch cho quân số đội hình, không phải vòng cân bằng số liệu mới. Rủi ro cân bằng phát sinh từ quân số lệch (1v3, 3v1) được ghi nhận ở mục 4.7/4.8 dưới dạng **CẦN PLAYTEST**, không tự sửa số.

### v1.7.0 → v1.8.0

51. **Chuyển combat 1v1 → 3v3** (mục 0.6, 1.5.0–1.5.2): `actors[]` tối đa 6 phần tử, mỗi đội tối đa 3. Thay field mơ hồ `phe` bằng cặp `doi` (`DOI_A`/`DOI_B`) + `dieu_khien` (`NGUOI_CHOI`/`AI`). *Lý do:* ở v1.7.0, trong PvP cả hai bên đều `phe = NGUOI_CHOI` nên "cùng phe / phe đối lập" của bảng target (mục 1.5.3) không xác định được; 3v3 làm lỗi này bộc lộ.
52. **Điều kiện thắng theo đội + hòa khi cùng bị xóa sổ + giới hạn hành động chống trận kéo dài vô hạn** (mục 1.5.5). Co-op 2v1 được **bảo lưu, không build ở v1.8.0** (mục 2.4.2).
53. **Team targeting** (mục 1.5.3): `MOT_DICH`/`MOT_DONG_DOI` bắt buộc `target_actor_id` khi có ≥2 mục tiêu hợp lệ, tự resolve khi chỉ còn 1; thêm read-model `lua_chon_hop_le` để UI disable target/skill không hợp lệ ngay từ đầu (server vẫn validate lại).
54. **Stat Allocation 5 điểm** (mục 0.7.10, 0.8.4): 6 stat (HP/ATK/DEF/SPD/MP/MP Regen), tối đa 2 điểm/stat, quy đổi theo **% chỉ số nền của Class** (không dùng số cố định vì spec chưa quy định thang chỉ số Class), chụp vào snapshot, respec tự do ngoài trận.
55. **SPD anti-snowball** (mục 0.8.1.H, 1.5.0): chỉ số cuối làm gốc; `spd_hien_tai` bị clamp trong [50%, 150%] gốc; tỉ lệ SPD nền Class ≤ 2:1; **trần lượt liên tiếp** (actor ≤ 2, đội ≤ 3) và **trần gauge**; viết thành invariant + test.
56. **CC audit** (mục 0.8.5): CC khoá (STUN/SILENCE/ROOT) không bị refresh khi đang mang; **Kháng CC** 2 lượt sau mỗi lần CC bị gỡ (tỉ lệ mất lượt do CC ≤ 50%); `so_luot` CC ≤ 2; CC khoá không được nhắm `TAT_CA_DICH`; `EFF_CLEANSE` ưu tiên gỡ `KHONG_CHE` (mục 0.8.1.J).
57. **Focus fire / counterplay** (mục 0.8.1.I, 0.13): không giảm damage toàn đội; dùng công cụ sẵn có (shield/heal/BUFF_DEF/CC/cleanse lên đồng đội) + **trần khiên = 50% HP tối đa** để shield không thành bất tử + trần lượt liên tiếp của đội. Không thêm effect mới (không taunt/guard).
58. **Passive audit** (mục 0.8.2, 1.5.3 bước 7c): *(a)* bổ sung bước flow còn thiếu cho 3 trigger `KHI_SU_DUNG_SKILL`/`KHI_GAY_SAT_THUONG`/`KHI_NHAN_SAT_THUONG` (ở v1.7.0 chỉ có `BAT_DAU_LUOT` và `BAT_DAU_TRAN` có đường thực thi — 3 trigger còn lại là dead enum); *(b)* passive chỉ được dùng `doi_tuong` không cần chọn target; *(c)* effect nguồn `NOI_TAI` không kích hoạt passive khác (chain depth = 1); *(d)* DOT/HOT không kích hoạt passive sát thương.
59. **Sửa lỗ hổng `KHONG_DU_MP`** (mục 1.5 #5a, 1.5.3 bước 4.5/15): v1.7.0 mô tả auto-pass thiếu MP ở 1.5 nhưng **không có trong flow `thuc_hien_luot_danh` và không có trong vòng auto-resolve bước 15**. Nay gom thành hàm dùng chung `xac_dinh_bo_luot_tu_dong` với thứ tự ưu tiên lý do cố định `BI_STUN` > `BI_SILENCE` > `KHONG_DU_MP` (không trộn lý do); thêm enum `ly_do_bo_luot` vào log.
60. **AI 3v3** (mục 1.5.4): thay heuristic `damage_score` (không phân biệt target, không hiểu heal/CC/đội) bằng **một scoring model deterministic có trọng số theo archetype** (`AGGRESSIVE`/`CONTROL`/`DEFENSIVE`/`ADAPTIVE`); AI chỉ dùng thông tin UI cũng hiển thị cho người chơi.
61. **PvE 3v3** (mục 1.6, 0.7.12): đội người chơi 3 vs đội AI 1–3; `man_choi.cau_hinh_ai` đổi sang `doi_ai[]` dùng Class + skill + `phan_bo_diem` + `ai_archetype`; seed tối thiểu 4 Class, mỗi Class ≥ 6 skill (mục 1.7).
62. **PvP 3v3** (mục 2.1–2.5): mỗi người chơi mang một **đội hình 3 nhân vật**, vẫn ghép bằng mã phòng (không có party matchmaking); thêm `phong_choi.doi_hinh_nguoi_tao/doi_hinh_nguoi_2` (v1.7.0 chưa có nơi lưu lựa chọn nhân vật trước khi trận bắt đầu).
63. **Luồng tạo nhân vật 5 bước + màn xác nhận** (mục 1.3): Class → Tên → Phân bổ điểm → Ngoại hình → Skill → Xem lại. Sửa các chỗ còn ghi "3 bước" (mục 1.2, 1.8) mà v1.7.0 đã quên cập nhật sau khi đổi sang 4 bước.
64. **Dev Mode / Sandbox 3v3** (mục 3.4, 3.5, 3.7, 3.8): validation mới (CC, passive target, SPD ratio, cảnh báo AOE/`TAT_CA_DONG_DOI`), Sandbox 3v3 dùng đúng engine production, có chế độ AI-vs-AI để thu metric.
65. **Tổng kết sau trận (read-model từ log) + Gameplay Metrics + Balance Principles** (mục 1.5.6, 0.13, 0.14). Metric nào cần telemetry ngoài log combat (Rematch Rate, One-More-Game Rate) chuyển sang roadmap vì hiện không có nguồn dữ liệu.
66. **Migration & Risk Assessment** (mục 4.6, 4.7): nhân vật cũ mặc định `diem_* = 0`; thêm `tran_dau.phien_ban_engine`; trận đang diễn ra tại thời điểm nâng cấp phải drain; danh sách hạng mục cần playtest.
67. **Tiêu chí nghiệm thu P0/P1 v1.8.0** (mục 0.15) và cập nhật các tiêu chí cũ bị ảnh hưởng bởi 3v3.

### v1.6.2 → v1.7.0

40. **Bổ sung hệ thống Nội tại Class (Class Passive)**: mỗi Class hoạt động phải có đúng 1 nội tại riêng, được lưu thành dữ liệu (`noi_tai_class`), có tên, mô tả, icon, điều kiện/kích hoạt và 1–2 effect từ registry 19 hiệu ứng. Nội tại không phải skill người chơi bấm; engine tự xử lý theo trigger đã cấu hình.
41. **Kích hoạt `BI_DONG_DAU_TRAN` cho Nội tại Class**: `thoi_diem = BI_DONG_DAU_TRAN` tiếp tục bị cấm trong skill thông thường, nhưng được phép trong cấu hình Nội tại Class khi trigger là `BAT_DAU_TRAN`; tránh nhầm giữa skill và passive.
42. **Bổ sung snapshot Nội tại Class**: mọi dữ liệu passive mà combat engine đọc phải được chụp vào `du_lieu_noi_dung_snapshot` lúc bắt đầu trận; Dev sửa passive giữa trận chỉ ảnh hưởng trận mới.
43. **Bổ sung tên nhân vật vào UX tạo nhân vật**: luồng tạo nhân vật đổi từ 3 bước thành 4 bước, thêm bước nhập `ten_nhan_vat`; server validate độ dài, ký tự điều khiển và dữ liệu rỗng sau trim. Tên nhân vật không bắt buộc duy nhất trong phạm vi người chơi ở v1.7.0.
44. **Chốt auto BỎ_LƯỢT vì thiếu MP**: sau khi hồi MP đầu lượt, server xác định tập skill thực sự khả dụng (skill hoạt động, cooldown = 0, đủ MP, thỏa SILENCE/ROOT). Nếu tập này rỗng vì actor **không đủ MP cho bất kỳ skill nào đang sẵn sàng**, server tự sinh BỎ_LƯỢT; không chờ client gửi action. Lượt vẫn hồi MP và giảm cooldown như mọi lượt khác.
45. **Mở rộng Dev Mode Class Editor**: chỉnh toàn bộ base stats `HP/ATK/DEF/SPD/MP/MP hồi mỗi lượt`, nội tại Class, trạng thái hoạt động/ẩn và liên kết skill.
46. **Mở rộng Dev Mode Passive Editor**: tạo/sửa nội tại bằng các effect có sẵn; giới hạn v1.7.0 ở tối đa 2 effect/passive, validate server-side, có preview cấu hình trước khi lưu.
47. **Mở rộng Dev Mode Skill Editor**: bổ sung icon, MP cost, cooldown, mô tả, danh sách effect có thứ tự và xem trước skill; vẫn không cho tạo loại effect mới.
48. **Bổ sung Sandbox Test cho Dev Mode**: cho phép thử Class/Skill/Passive trong trận mô phỏng không ảnh hưởng dữ liệu người chơi và không ghi vào tiến độ Đi ải/PvP. Sandbox phải dùng cùng combat engine, nhưng có dữ liệu test tách biệt và không được làm thay đổi trận đang diễn ra.
49. **Bổ sung guard dữ liệu nội dung**: mã Class/Skill/Passive không trùng; stat và tham số effect phải nằm trong range hợp lệ; không cho lưu Class hoạt động mà thiếu passive; không cho lưu skill/passive chứa effect không hợp lệ hoặc target không tương thích.
50. **Bổ sung acceptance test P0/P1 cho passive, tên nhân vật, auto-pass MP và Dev Sandbox**, đồng thời cập nhật snapshot/flow combat để không còn field "có tồn tại nhưng không được engine tiêu thụ".

### v1.6.1 → v1.6.2

39. **Tách vòng lặp auto-resolve (AI/STUN/SILENCE) ra khỏi transaction của lượt hiện tại.** Ở v1.6.1, bước 12b mô tả việc gọi lại `thuc_hien_luot_danh` cho actor kế tiếp (AI/STUN/SILENCE) "ngay trong cùng luồng xử lý request hiện tại" và coi mỗi lượt trong chuỗi là "một transaction riêng", nhưng đoạn mô tả đó nằm **trước** bước 13 (ghi log) và bước 14 (COMMIT) của chính lượt hiện tại trong flow — đọc như một transaction con lồng bên trong transaction chưa COMMIT, điều PostgreSQL RPC/function không làm được theo nghĩa transaction DB thật (không phải savepoint). Chốt lại: bước 12 chỉ xác định actor kế tiếp; bước 13-14 ghi log và COMMIT transaction của lượt hiện tại như bình thường; **auto-resolve loop chuyển hẳn thành bước 15 mới**, chạy ở tầng application/request **sau khi** transaction ở bước 14 đã COMMIT — mỗi invocation trong chuỗi (AI, hoặc BỎ_LƯỢT tự sinh do STUN/SILENCE) là một lệnh gọi `thuc_hien_luot_danh` hoàn toàn mới, tự mở transaction DB riêng, application phải đợi invocation trước COMMIT xong mới gọi invocation kế tiếp (không song song, không nested). Sửa mục 1.5.3 (bước 2, 12, thêm bước 15), mục 2.3, 2.4.1, và acceptance test 0.12.

### v1.6 → v1.6.1

34. **Chốt lại DUY NHẤT một cách hiểu cho ngữ nghĩa `so_luot` nhóm A (STUN/SILENCE/ROOT/SLOW/BUFF_ATK/DEF/SPD/DEBUFF_ATK/DEF)** — đóng mâu thuẫn giữa mục 0.8.1.M (ví dụ số cũ ngụ ý STUN `so_luot=2` chỉ thực sự chặn 1 lượt) và acceptance test cũ ở mục 0.12 (đòi hỏi STUN `so_luot=2` phải chặn đúng 2 lượt). Chốt theo hướng acceptance test: effect có hiệu lực **trong suốt** lượt actor mang effect được ATB chọn; `so_luot` chỉ giảm **sau khi** lượt đó hoàn tất (cùng lúc với giảm cooldown ở bước 12a của `thuc_hien_luot_danh`), gỡ effect khi chạm 0 — áp dụng cho lượt **tiếp theo** trở đi. Sửa mục 0.8.1.M, mục 0.8.1.E, và làm rõ lại flow 1.5.3.
35. **Thêm bước PRE-ACTION STATUS tường minh vào flow `thuc_hien_luot_danh`** (mục 1.5.3, bước 4.5 mới): server tự sinh hành động BỎ_LƯỢT cho actor đang STUN, hoặc đang SILENCE mà không còn skill hợp lệ — không chờ/không đọc `ky_nang_id` client gửi. ROOT giữ nguyên không auto-pass (đúng mục 0.8.1.G).
36. **Thêm vòng lặp auto-resolve ở bước 12b**: sau khi ATB chọn actor kế tiếp, nếu actor đó là AI/STUN/SILENCE-không-còn-skill, server tự gọi lại chính primitive `thuc_hien_luot_danh` cho actor đó ngay trong cùng luồng xử lý request hiện tại (không cần một request khác "chạm" vào trận), lặp tới khi gặp actor cần input thật từ client hoặc trận kết thúc — giải quyết việc PvP không cần chờ hết 90 giây cho một actor vốn không được phép hành động, không tạo combat engine thứ hai (tái dùng đúng 1 primitive). *(Cách mô tả cơ chế "chuỗi transaction" ở bản v1.6.1 gây hiểu nhầm thành transaction con lồng trong transaction của lượt trước — đã tách rõ và chuyển thành bước 15 riêng ở v1.6.2, xem mục 39.)*
37. **Thêm bất biến version Realtime cho TIMEOUT**: mọi mutation canonical của trận — lượt đánh bình thường, auto-pass STUN/SILENCE/AI, và TIMEOUT resolution — đều phải tăng `so_luot` đúng 1 trong cùng transaction (mục 2.3, 2.5). Tiếp tục dùng `so_luot` làm version đơn nhất (không thêm field `combat_version` riêng, giữ scope tối thiểu).
38. **Bổ sung acceptance test P0** cho 3 điểm trên — xem mục 0.12.

### v1.5 → v1.6

18. **Chốt chính xác thời điểm giảm cooldown**: cooldown của MỌI skill đang >0 của một actor giảm đúng 1 mỗi khi actor đó **kết thúc một lượt của chính mình** — bất kể lượt đó là dùng skill, BỎ_LƯỢT chủ động, hay bị ép BỎ_LƯỢT do STUN/SILENCE. Trước đây chỉ mục STUN nói rõ điều này; nay áp dụng thống nhất, kèm ví dụ số cụ thể (mục 1.5 #4).
19. **Chốt ngữ nghĩa `so_luot` thống nhất cho mọi effect có duration** (BUFF/DEBUFF/STUN/SILENCE/ROOT/SLOW đếm theo lượt của actor **mang** effect, tách biệt khỏi DOT/HOT đếm theo lượt toàn trận đã có từ trước) — thêm mục 0.8.1.M kèm ví dụ số.
20. **(Lịch sử v1.6) Chốt ngữ nghĩa `thoi_diem`**: v1.6 chỉ vận hành `KHI_THI_TRIEN`; `KHI_DANH_TRUNG` và `BI_DONG_DAU_TRAN` bị cấm dùng trong Skill. **v1.7.0 mở rộng có chủ đích `BI_DONG_DAU_TRAN` cho Nội tại Class**; Skill Creator vẫn reject giá trị này. Xem mục 0.8.2.
21. **Chốt DOT/HOT không tick trên actor đã chết trong cùng lượt xử lý** trước khi tới bước DOT/HOT (mục 0.8.1.L, mục 1.5.3 bước 9).
22. **Thêm mục 1.5.5 — Xác định kết quả trận đấu**: chốt rõ trường hợp chết đồng thời (PvE/PvP 1v1 → HOA; Co-op 2v1 → ưu tiên người chơi thắng nếu AI và toàn bộ người chơi cùng hp≤0 ở cùng bước kiểm tra, ⚠️ CẦN DUYỆT) và xác nhận AOE không thể tự gây chết cả hai bên vì không effect nào trong 19 hiệu ứng gây sát thương lên `BAN_THAN`.
23. **Chốt cơ chế xác thực `nguoi_thuc_hien_id`** (mục 1.5.3 bước 2): server lấy identity từ session/auth context, đối chiếu với chủ sở hữu actor; ID client tự khai chỉ là tham khảo; hành động AI phải sinh từ server-side trusted path.
24. **Thêm invariant cấm client mutate trực tiếp `tran_dau`** và ghi chú RLS (mục 0.3).
25. **Chốt cơ chế PvP timeout "tự động"**: mọi request đọc/hành động chạm tới trận PvP đã quá `han_luot_luc` phải resolve TIMEOUT trước khi xử lý tiếp; việc trận tự kết thúc ngay cả khi cả hai client im lặng vĩnh viễn cần job nền riêng — ⚠️ CẦN DUYỆT nếu bạn cần đảm bảo điều này (mục 2.5).
26. **Thêm rule chống áp event Realtime cũ sau khi đã có snapshot mới hơn**, dùng `so_luot` làm version đơn điệu (mục 2.3).
27. **Chốt `NGAU_NHIEN_N_DICH` cố định N=1** cho v1, bỏ khái niệm "N nếu có" (mục 0.7.6, 1.5.3).
28. **Chốt công thức `damage_score` của AI cho từng loại effect SAT_THUONG** (trực tiếp/AOE/xuyên giáp cộng `he_so`; DOT cộng `sat_thuong_moi_luot × so_luot`) — ⚠️ CẦN DUYỆT vì là heuristic trộn đơn vị, chỉ cần deterministic (mục 1.5.4).
29. **Làm rõ snapshot cho actor AI**: dữ liệu AI (từ `man_choi.cau_hinh_ai` hoặc cấu hình cố định PvE Đối kháng) được copy vào `du_lieu_noi_dung_snapshot` giống hệt actor người chơi; `man_choi` không có CRUD qua Dev Mode ở v1 nên không có rủi ro bị sửa giữa trận, nhưng vẫn snapshot để nhất quán nguyên tắc (mục 1.5.2).
30. **Thêm guard SILENCE/ROOT vào flow `thuc_hien_luot_danh`** (mục 1.5.3 bước 5) — trước đây luật này chỉ nằm ở mục 0.8.1.F/G, chưa được liệt kê như một bước GUARD tường minh trong flow chính.
31. **Mở rộng schema `nhat_ky_luot_danh`** để ghi rõ thứ tự từng effect áp dụng, target đã resolve, sát thương/hồi máu thực tế từng effect, effect nào bị bỏ qua vì target đã chết (mục 0.7.13).
32. **Thêm bảng MP/cooldown theo từng trường hợp** (dùng skill / BỎ_LƯỢT chủ động / STUN / SILENCE / ROOT) vào mục 1.5.
33. **Thêm acceptance test P0 mới** cho toàn bộ điểm trên — xem mục 0.12 và các mục nghiệm thu liên quan.

### v1.4 → v1.5
14. **Thêm mục 0.8.1 — "Quy tắc thi hành 19 hiệu ứng"**: định nghĩa công thức damage/DEF, stacking, duration, timing và tương tác với shield/death/cleanse cho từng effect. Đây là khoảng trống lớn nhất ở v1.4 — trước đó chỉ có schema tham số, chưa có ngữ nghĩa thực thi, khiến engine không xác định (indeterminate) khi implement. **Một số quy tắc trong mục này là quyết định thiết kế game (STUN/SILENCE/ROOT hoạt động thế nào, thứ tự CLEANSE/DISPEL, buff cùng loại cộng dồn hay refresh...) — đã chọn giá trị mặc định hợp lý để không chặn tiến độ build, nhưng đánh dấu rõ ràng (⚠️ CẦN DUYỆT) để bạn xác nhận hoặc đổi trước khi build, không tự chốt thay bạn.**
15. **Thêm `target_actor_id` (tuỳ chọn) vào input của `thuc_hien_luot_danh`** (mục 1.5.3), cùng luật server validate target — giải quyết trường hợp Co-op có nhiều hơn 1 mục tiêu hợp lệ cho `MOT_DICH`/`MOT_DONG_DOI` mà v1.4 chưa có cách chọn.
16. **`tran_dau.ket_qua` đổi từ enum mơ hồ `THANG|THUA|HOA` sang cấu trúc xác định actor**: thêm `actor_ids_thang` (mảng actor_id thuộc bên thắng, rỗng nếu hoà) — không còn phải suy ngược từ `nhat_ky_luot_danh`, và không còn mơ hồ "THANG là ai thắng" trong PvP 1v1 (mục 0.7.13, 1.6, 2.4).
17. **Thêm invariant khoá bản ghi trận đấu** trong `thuc_hien_luot_danh` (mục 1.5.3, bước GUARD đầu tiên): cấm hai giao dịch đồng thời cùng đọc `actor_dang_di` rồi cùng vượt guard — không ép cú pháp SQL cụ thể, chỉ ép bất biến (invariant) mà mọi implementation phải đảm bảo.

### v1.1 → v1.2
1. **Thứ tự lượt đổi từ luân phiên cố định sang ATB (Active Time Battle) theo Tốc độ.** Xem mục 1.5.0. Đây là thay đổi kiến trúc lớn nhất của bản này — SPD giờ quyết định thật sự thứ tự lượt, khác hẳn giả định cũ ở v1.1 (mục 4.1 #4 cũ đã bị loại bỏ).
2. **Hệ thống MP được đưa vào chính thức**, thay cho field mồ côi `chi_phi_nang_luong` ở v1.1. Thêm `class.mp_nen`, `ky_nang.chi_phi_mp`, và `mp_hien_tai`/`mp_toi_da` trong snapshot combat.
3. **`trang_thai_chien_dau` đổi từ cấu trúc cố định `ben_a`/`ben_b` sang mảng `actors[]`** — dùng chung được cho PvE 1v1, PvP 1v1 và Co-op 2v1, không cần đập schema khi mở rộng sau này.
4. **Luật Co-op (Đi ải cùng nhau) được chốt rõ**: một người chơi chết, người còn lại tiếp tục chiến đấu; trận chỉ kết thúc khi cả hai người chơi chết hoặc AI chết. Bỏ luật thứ tự cố định "A → B → AI" (mâu thuẫn với ATB), thay bằng: cả 2 nhân vật người chơi và AI đều là actor tham gia tính gauge ATB như nhau.
5. **Luật AI chọn skill được chốt thành thuật toán deterministic** (mục 1.5.4), kèm luật AI chọn mục tiêu khi có nhiều người chơi còn sống (Co-op).
6. **PvP "ai đi trước" không còn là luật độc lập** — do ATB quyết định theo SPD. "Người tạo phòng đi trước" chỉ còn là **luật tie-break** khi gauge hai bên bằng nhau tuyệt đối (mục 2.1).

### v1.2 → v1.3
7. **Làm rõ ATB là dạng event-based/đếm theo hành động**, không chạy theo đồng hồ thực — vẫn hoàn toàn turn-based đúng nguyên tắc 0.3 (mục 1.5.0). Thuật toán không đổi, chỉ làm rõ ngữ nghĩa để tránh dev/UI hiểu nhầm thành ATB real-time.
8. **Sửa câu chữ "luân phiên" còn sót ở PvP Đối kháng (2.4.1)** — trước đây mâu thuẫn với ATB đã chốt ở v1.2, nay đã thống nhất.
9. **Thêm cơ chế snapshot nội dung bất biến theo trận** (`tran_dau.du_lieu_noi_dung_snapshot`, mục 1.5.2 + 3.7): trận đang diễn ra luôn dùng đúng 1 phiên bản Class/Skill chốt lúc bắt đầu, không bị ảnh hưởng nếu Dev sửa dữ liệu giữa chừng — đồng thời giải quyết luôn nhu cầu "biết log trận cũ dùng skill phiên bản nào" mà không cần thêm bảng version riêng.
10. Ghi nhận (không build ở v1): định hướng AI có nhiều chiến lược hơn thay vì luôn ưu tiên damage cao nhất — xem mục 4.4.

### v1.3 → v1.4
11. **Chốt rõ phạm vi snapshot** (mục 1.5.2): liệt kê tường minh cái gì PHẢI nằm trong snapshot (chỉ số class + định nghĩa skill), cái gì KHÔNG cần (ngoại hình/UI, registry 19 hiệu ứng — vì registry là hằng số code, đóng, không qua Dev Mode) — để tránh hiểu nhầm là thiếu sót.
12. **Thêm luật "cấm fallback tuyệt đối"**: `thuc_hien_luot_danh` không được đọc bảng `class`/`ky_nang` sống khi đang xử lý trận đã có snapshot, kể cả khi snapshot thiếu dữ liệu bất thường — trường hợp đó phải từ chối hành động, không được âm thầm lấy bù từ bảng sống.
13. Viết lại đoạn giải thích ATB (mục 1.5.0) thành câu dứt khoát: "ATB trong v1 không phải hệ thống thời gian thực" — chỉ diễn đạt lại cho rõ, không đổi thuật toán.

> Tài liệu kỹ thuật đầy đủ, một file duy nhất. Đọc từ đầu đến cuối theo đúng thứ tự Phần 0 → 1 → 2 → 3 → 4; các phần sau đều phụ thuộc Phần 0.

**Mục lục:**
- Phần 0 — Kiến trúc & Mô hình dữ liệu (nền tảng dùng chung)
- Phần 1 — Nền tảng & PvE
- Phần 2 — PvP
- Phần 3 — Chế độ Dành cho nhà phát triển
- Phần 4 — Phụ lục (giả định, câu hỏi mở, lộ trình build)

---

# PHẦN 0 — KIẾN TRÚC & MÔ HÌNH DỮ LIỆU

> Phần nền tảng, dùng chung cho Phần 1, 2, 3.

## 0.1 Phạm vi hệ thống

Game đấu trường nhân vật theo lượt (turn-based), **combat theo đội với quân số linh hoạt 1–3 nhân vật/đội** (tối đa 6 actor/trận), hai chế độ PvE (đấu máy) và PvP (đấu người qua mã phòng), có khu vực quản trị nội dung ("Dành cho nhà phát triển") cho phép tạo Class/Skill/Ngoại hình mới **hoàn toàn bằng thao tác trong ứng dụng, không cần sửa code**.

## 0.1a Architecture Decision Records (ADR) — mới ở v1.9.0

> Chỉ ghi các quyết định mà nếu hiểu sai sẽ dẫn tới hai implementation khác nhau. Không tạo ADR cho chi tiết vặt.

**ADR-01 — Shared Combat Engine là application/server module, không phải PostgreSQL function.**
- *Problem:* v1.8.0 mô tả Online Runtime là "PostgreSQL function/RPC... gọi Shared Combat Engine", ngụ ý PostgreSQL có thể host engine — không khả thi nếu engine viết bằng TypeScript/JavaScript.
- *Decision:* Engine là module application/server thuần logic; Local Runtime gọi in-process, Online Runtime gọi từ Edge Function/backend service; PostgreSQL chỉ persistence/transaction/locking (mục 0.2).
- *Why:* Tránh phải viết 2 bản logic bằng 2 ngôn ngữ (PL/pgSQL cho online, JS cho local) — vi phạm chính nguyên tắc "một engine dùng chung".
- *Consequence:* Mọi RPC/hàm SQL trong tài liệu chỉ được hiểu là lớp ghi/khoá, không chứa nhánh rẽ theo effect/skill/target nào.

**ADR-02 — Một roster nhân vật local dùng cho cả PvE lẫn PvP; PvP nhận "bản khai nhân vật" thay vì đọc nhân vật từ server (thay thế bản "hai hồ tách biệt" của v1.9.0).**
- *Problem:* PvE phải chơi được không cần tài khoản/server; nhưng người chơi muốn mang chính nhân vật của mình (kể cả Linh Thần đã mở) vào PvP với bạn bè. Hai hồ nhân vật tách biệt làm mất động lực mở khoá và buộc dựng bảng nhân vật/inventory phía server.
- *Decision:* nhân vật chỉ lưu ở local (`nhan_vat`, khoá `nguoi_choi_local_id`). Vào phòng PvP, client gửi **bản khai** 1–3 nhân vật; server xác thực **tính hợp lệ** (mục 2.2) rồi tự tính chỉ số cuối từ content của server — không xác thực **quyền sở hữu** (ADR-08).
- *Why:* đúng đối tượng chơi là nhóm bạn; giữ PvE offline; không cần bảng nhân vật phía server.
- *Consequence:* không có "nhân vật online" riêng; `nguoi_choi` chỉ là danh tính phòng (ADR-10).

**ADR-03 — Content Bundle: JSON + version int + SHA-256 hash.**
- *Problem:* PvE cần nội dung Class/Skill data-driven mà không query online — cần một cơ chế đóng gói cụ thể.
- *Decision:* Bundle JSON, `phien_ban_content` tăng dần, `content_hash` SHA-256 verify trước khi cache, tải khi có mạng ở Menu chính, không đổi giữa trận (mục 0.6a).
- *Why:* Quy mô nội dung nhỏ, JSON đủ nhanh/dễ debug; hash đơn giản, không cần hạ tầng CDN/signing phức tạp cho v1.8.x.
- *Consequence:* Không hỗ trợ patch nội dung tăng dần (delta) ở v1.8.x — mỗi lần cập nhật tải lại toàn bộ bundle; chấp nhận được vì quy mô nhỏ.

**ADR-04 — RNG: PRNG thuần thuật toán, seed theo trận, state lưu trong snapshot.**
- *Problem:* Không thể chứng minh Local/Online equivalence (OFF-08) nếu không kiểm soát được nguồn ngẫu nhiên.
- *Decision:* Một PRNG thuần hàm số (không phụ thuộc runtime), seed sinh 1 lần tại `bat_dau_tran`, state advance và lưu lại sau mỗi lần dùng, log vào `nhat_ky_luot_danh` (mục 1.5.0a).
- *Why:* Bề mặt cần random trong engine tối thiểu (chỉ `NGAU_NHIEN_N_DICH`) — không cần hệ thống RNG phức tạp, chỉ cần seed được và cùng thuật toán ở cả 2 runtime.
- *Consequence:* Cấm dùng `Math.random()`/`crypto.getRandomValues()` trực tiếp trong Shared Combat Engine.

**ADR-05 — Co-op/Victory: hoà khi cả hai team cùng bị xoá sổ, không ưu tiên bên nào.**
- *Problem:* v1.6 từng có nhánh "ưu tiên người chơi thắng" khi AI và người chơi cuối cùng chết cùng lượt — không đối xứng, khó tổng quát hoá khi Co-op có nhiều actor.
- *Decision:* Luật duy nhất: team nào còn actor sống thì thắng; nếu cả hai team cùng hết actor sống ở cùng lần kiểm tra → hoà (mục 1.5.5).
- *Why:* Đối xứng, deterministic, không cần luật đặc cách theo chế độ chơi.
- *Consequence:* Co-op giờ cũng có thể kết thúc HOA (trước đây không có khái niệm này ở Co-op).

**ADR-06 — CC chồng lớp: Diminishing Returns (giảm 1/2, tối thiểu 1).**
- *Problem:* 3v3 làm tăng rủi ro CC-lock (nhiều actor cùng khống chế 1 actor liên tục) mà v1.8.0 gốc chưa có cơ chế chống.
- *Decision:* CC mới áp lên actor đang có CC hiệu lực chỉ nhận `ceil(so_luot/2)`, tối thiểu 1 (mục 0.8.1.N).
- *Why:* Đơn giản, deterministic, đủ giảm rủi ro khoá vĩnh viễn mà không cần hệ thống miễn nhiễm phức tạp.
- *Consequence:* Cần playtest xác nhận hệ số 1/2 là đủ (ghi ở mục 4.8, CẦN PLAYTEST).

**ADR-07 — Hương Hỏa: nguồn DUY NHẤT là PvE First Clear; Hương Hỏa được tiêu cho Hero preset hoặc Linh Thần (chốt lại ở v2.2.0, bỏ hẳn "mục tiêu phụ" của v2.1.0).**
- *Problem:* cần động lực cho PvE (mở Linh Thần SSS) nhưng thưởng theo mỗi trận thắng là faucet vô hạn qua "Đấu lại" (đã chứng minh ở mục 4.4c); v2.1.0 từng thêm "mục tiêu phụ" làm nguồn thứ 2 nhưng đây là mở rộng không cần thiết cho MVP — tăng bề mặt dữ liệu/test mà không phục vụ mục tiêu chính ("first-clear đủ đúng 1 SSS, 3 SSS còn lại là content gate có chủ đích").
- *Decision:* Hương Hỏa chỉ đến từ **first-clear mỗi màn Đi ải**, mỗi màn **một lần duy nhất** (INV-PVE-1, mục 0.8.6.E). Ghi bằng cờ idempotent (`tien_do_di_ai.da_hoan_thanh`) trong cùng giao dịch với kết thúc trận. Replay/Rematch/Retry/PvE Đối kháng/PvP: luôn 0. Seed MVP: 3 màn × 100 = **300**; 300 vẫn là giá 1 Linh Thần nhưng người chơi có thể tiêu một phần cho Hero preset. Bỏ hoàn toàn `muc_tieu_phu`/`muc_tieu_da_nhan` khỏi schema (0.7.12/0.7.13) — không phải deprecate, mà xoá hẳn vì chưa từng build.
- *Why:* một nguồn duy nhất, một invariant duy nhất, dễ audit/test hơn hai nguồn; không đổi mục tiêu sản phẩm (vẫn "chơi hết MVP → chọn đúng 1 trong 4 Linh Thần").
- *Consequence:* dữ liệu local có thể bị sửa (chấp nhận theo mục 0.1b); Linh Thần thứ 2–4 **chưa có nguồn nào trong MVP** — content gate có chủ đích, UI phải nói rõ (mục 1.4a/1.4b), không phải bug.

**ADR-08 — PvP xác thực TÍNH HỢP LỆ của nhân vật, không xác thực QUYỀN SỞ HỮU; `CAN_BANG` chỉ vô hiệu hệ số stat của tier, không vô hiệu kit.**
- *Problem:* cho nhân vật local (kể cả SSS) vào PvP trong khi server không có inventory; đồng thời cần nói chính xác `CAN_BANG` "cân bằng" cái gì — nếu chỉ vô hiệu stat mà gọi chung chung là "vô hiệu hoá Linh Thần" sẽ sai, vì Nội tại/skill riêng của Linh Thần vẫn hoạt động.
- *Decision:* server (1) kiểm tra toàn bộ bản khai theo luật chơi (mục 2.2), (2) tự tính chỉ số cuối từ content của server, (3) tôn trọng `phong_choi.che_do_tier`: **`CAN_BANG` (mặc định) vô hiệu các hệ số stat do tier mang lại (mọi actor tính `he_so_tier = 1.00` bất kể `tier` thật, kể cả SSS) — nhưng KHÔNG vô hiệu Nội tại/skill/kit riêng của Linh Thần.** `TU_DO` áp `he_so_tier` đầy đủ theo tier thật. Ở cả hai chế độ, Linh Thần vẫn mạnh hơn nhờ Layer 2 (kit, mục 0.8.4.G) — `CAN_BANG` chỉ triệt tiêu lợi thế con số thô (Layer 1), không triệt tiêu bản sắc lối chơi.
- *Why:* mô hình "tin client về sở hữu, kiểm tra luật chơi" đủ cho nhóm bạn; người tạo phòng chọn luật công bằng; xoá cả kit sẽ biến Linh Thần đã mở thành vô dụng trong phòng `CAN_BANG`, triệt tiêu động lực đã bỏ công mở khoá.
- *Consequence:* bạn nào sửa local để có SSS vẫn chơi được ở phòng `TU_DO` (chấp nhận, mục 0.1b) với đầy đủ cả 2 lớp sức mạnh; phòng `CAN_BANG` không bị ảnh hưởng ở Layer 1 dù ai sửa gì, nhưng Layer 2 (kit) luôn có hiệu lực cho mọi actor `LINH_THAN` ở mọi phòng. Local SSS **không** tự động có ý nghĩa gì ngoài quyền được đưa vào bản khai — không có "ownership online" nào được cấp; nếu game công khai → cần ownership phía server (Future, mục 4.4).

**ADR-09 — Tier Ladder 6 bậc (C/B/A/S/SS/SSS), đường cong làm mượt ở v2.3.0; SSS khác biệt rõ rệt ở cả 2 lớp (stat + kit bắt buộc), không phải "S nhưng +stat".**
- *Problem:* ladder trước chỉ có B/A/S/SSS (thiếu SS) và khoảng cách S→SSS quá nhỏ (1.06→1.10, +4%). v2.2.0 sửa bằng ladder 6 bậc + bước nhảy SS→SSS phóng to tới +14 điểm % (so với +5-8 giữa các bậc khác) — nhưng balance audit ở v2.3.0 chỉ ra bước nhảy đó **cộng dồn theo kiểu nhân (không phải cộng thẳng) với Stat Allocation**: `chi_so_cuoi = chi_so_nen × he_so_tier × (1 + %Stat Allocation)`, nên +30% tier của SSS (v2.2.0) cộng với +12% Stat Allocation tối đa cho ra **+45,6%** tổng so với B — lớn hơn đáng kể con số "+30%" nhìn thấy trên bảng, trong khi Layer 2 (kit) khi đó mới chỉ là *khuyến nghị*, không phải điều kiện bắt buộc — nghĩa là một Linh Thần có thể "mạnh nhờ số" mà không thực sự khác biệt về lối chơi.
- *Decision:*
  1. **Làm mượt lại đường cong Layer 1** — xem bảng số mới ở mục 0.8.4.B: khoảng cách B→SSS giảm từ +30% xuống **+22%** (tổng cộng dồn với Stat Allocation tối đa còn **~+36,6%**, giảm ~9 điểm % so với trước) — vẫn giữ `SS→SSS` là bước nhảy lớn nhất ladder (+9, so với +4-6 giữa các bậc còn lại) nên SSS vẫn rõ ràng là tier cao nhất, nhưng không còn là một cú nhảy đột biến.
  2. **Biến Layer 2 từ khuyến nghị thành acceptance contract bắt buộc** (mục 0.8.4.G): mỗi Linh Thần phải có ít nhất 1 đặc điểm kit được tác giả **gắn cờ tường minh** (`dac_trung_rieng = true` trên 1 skill hoặc Nội tại, mục 0.7.4/0.7.6) tạo khác biệt gameplay nhận biết được — không phải chỉ đổi tên/đổi số nhỏ. Server **từ chối lưu** (hard block, không phải cảnh báo mềm) một Class `LINH_THAN` không có bất kỳ `dac_trung_rieng=true` nào.
  3. Giữ nguyên: nhân vật người chơi **tự tạo** roll `{B, A, S}`; **Hero preset** dùng tier cố định `{B,A,S,SS}` theo seed; AI dùng `{C,B,A,S,SS}`; Linh Thần luôn `SSS` không roll. `C` bị chặn khỏi `nhan_vat`; `SS` chỉ hợp lệ khi Class là Hero preset.
- *Why:* Tổng sức mạnh của SSS giờ được tạo từ **2 lớp cân bằng hơn** — Layer 1 nhỏ lại nhưng vẫn rõ ràng nhất ladder, Layer 2 từ "lời khuyên" thành "điều kiện PASS/FAIL kiểm tra được" — tránh vừa stack số lớn vừa không có gì đặc trưng về lối chơi. Không dùng tiên đề "SSS phải mạnh nên +14 là đúng" — quyết định dựa trên phép tính cộng dồn thực tế ở trên.
- *Consequence:* SSS vẫn đi qua nguyên Shared Combat Engine (ATB/MP/cooldown/CC/target/death) như mọi actor — Layer 1+2 chỉ quyết định *độ mạnh của input* vào engine, không bypass bất kỳ bước nào (đóng yêu cầu "SSS không auto-win"). Dev Mode không thể publish một Linh Thần "chỉ +stat" nữa — phải đi kèm ít nhất 1 đặc điểm kit được đánh dấu rõ. Tier không đổi sau khi tạo; xoá rồi tạo mới là cách duy nhất "reroll" nhân vật `THUONG`. Toàn bộ con số % vẫn là PLAYTEST-VERIFIABLE -- BALANCE SEED, không phải invariant kiến trúc -- chỉ cấu trúc "2 lớp, SSS là bước nhảy lớn nhất, Layer 2 bắt buộc" là bất biến thiết kế.

**ADR-10 — Danh tính PvP = phiên ẩn danh + tên hiển thị (không username/mật khẩu).**
- *Problem:* bảng `nguoi_choi` từng có `ten_dang_nhap`/`mat_khau_hash` nhưng không có màn hình/luồng đăng ký hay đăng nhập nào — lỗ hổng đặc tả; đăng ký mật khẩu là ma sát lớn với nhóm bạn.
- *Decision:* lần đầu vào PvP hỏi `ten_hien_thi`, tạo phiên ẩn danh (Supabase anonymous auth hoặc tương đương); `nguoi_choi.id` = auth uid; không lưu mật khẩu người chơi.
- *Why:* identity vẫn lấy từ auth context (nguyên tắc mục 1.5.3 bước 2); không có dữ liệu nào phía server cần giữ lâu dài vì roster ở local.
- *Consequence:* xoá dữ liệu trình duyệt = danh tính PvP mới nhưng không mất nhân vật; nếu cần tài khoản bền vững → Future.


## 0.1b Threat Model & giả định tin cậy (mới ở v2.1.0)


Đối tượng chơi là **nhóm bạn quen biết**, không phải cộng đồng công khai. Từ đó:

| | Nội dung |
|---|---|
| **Mục tiêu** | Đúng (deterministic, không lệch trạng thái giữa hai người, không hành động kép), không mất dữ liệu người chơi, công bằng ở mức xã hội (luật phòng hiển thị rõ), không để bạn bè vô tình phá nội dung dùng chung |
| **Không phải mục tiêu** | Chống gian lận đối kháng, dữ liệu local chống sửa, tiền tệ bảo mật, xác thực quyền sở hữu nhân vật, chống bot |
| **Giữ lại (vì rẻ và cho đúng/ổn định, không phải để chống cheat)** | PvP xử lý lượt phía server (một nguồn sự thật, tránh lệch trạng thái/double-action); cổng mật khẩu Dev Mode (tránh bạn vô tình sửa content chung); danh tính lấy từ phiên xác thực (không tin ID client gửi); RLS chặn ghi trực tiếp vào trận |
| **Chủ động nới lỏng** | Không xác thực sở hữu Linh Thần/tier trong PvP (ADR-08); không bảo vệ local save (mục 0.8.6.H); không anti-bot; không mật khẩu người chơi (ADR-10) |
| **Lộ trình nếu game thành công/công khai** | Ownership phía server (server cấp và ký "phiếu mở khoá"), tài khoản bền vững, cloud save — thuộc Future (mục 4.4); kiến trúc hiện tại không chặn các bước này |

Không tài liệu nào được gọi dữ liệu local là "an toàn/chống gian lận". Người chơi sửa dữ liệu của chính mình trong PvE là chấp nhận được; hậu quả duy nhất khi lạm dụng trong PvP nằm ở phòng `TU_DO` do chính người tạo phòng chọn.


## 0.2 Ngăn xếp công nghệ — Shared Combat Engine trên hai Runtime

**Nguyên tắc nền (đọc trước mọi mục kỹ thuật khác):** toàn bộ logic gameplay ở mục 1.5 (ATB, target, skill, effect, passive, damage, CC, MP, cooldown, DOT/HOT, victory, trần lượt, snapshot, AI decision interface, random/seed, combat log) là **Shared Combat Engine** — **một application/server module duy nhất** (ví dụ TypeScript/JavaScript chạy trên Node/Edge runtime), không copy-paste, không viết hai bộ luật khác nhau cho PvE và PvP, và **không phải là một PostgreSQL function/PL-pgSQL** — PostgreSQL không host hay import module này.

```text
                       SHARED COMBAT ENGINE
                    (application/server module)
                              │
                ┌─────────────┴─────────────┐
                │                           │
          LOCAL RUNTIME               ONLINE RUNTIME
          PvE (offline)                PvP (online)
                │                           │
        chạy in-process trên       chạy trong application/
        thiết bị người chơi        server runtime (Edge Function
                │                  hoặc backend service tương đương)
                │                           │
                │                    1 DB transaction/lượt
                │                           │
          Local storage             PostgreSQL (Supabase) — CHỈ
        (IndexedDB/tương đương)     persistence + transaction +
                                    locking + atomic commit
```

**Chốt ranh giới host (v1.8.1 — đóng mơ hồ của v1.8.0):**
- Shared Combat Engine là **application/server module**, không phải PostgreSQL function. Toàn bộ tính toán (ATB, resolve target, damage, effect, passive, victory...) chạy ở tầng application, cho cả hai runtime.
- **Local Runtime** gọi Shared Combat Engine **trực tiếp trong tiến trình (in-process)** của ứng dụng game trên thiết bị — không qua network, không qua PostgreSQL.
- **Online Runtime** gọi Shared Combat Engine từ **application/server runtime** (Edge Function hoặc backend service tương đương) — engine tính toán xong trong bộ nhớ application, sau đó application **ghi kết quả xuống PostgreSQL trong đúng 1 transaction** (khoá bản ghi, ghi atomic, commit).
- **PostgreSQL chỉ chịu trách nhiệm persistence, transaction boundary, locking và atomic commit** — không chứa logic quyết định gameplay. Nếu lộ ra như một "RPC" hay "hàm SQL", hàm đó chỉ làm nhiệm vụ ghi/khoá bản ghi, **không phải nơi Shared Combat Engine thực thi**.
- Không có cách viết nào trong tài liệu này được hiểu là "PostgreSQL function/RPC trực tiếp chạy Shared Combat Engine" — mọi chỗ nhắc "RPC" (ví dụ tên primitive `thuc_hien_luot_danh`, `bat_dau_tran`) là tên của **hợp đồng (contract)/API cấp application**, được implement bằng Edge Function/application server gọi engine rồi ghi Postgres, không phải một PL/pgSQL function ôm toàn bộ logic.

| Runtime | Dùng cho | Nơi chạy Shared Combat Engine | Nơi lưu trạng thái | Cần Internet để chơi? |
|---|---|---|---|---|
| **Local Runtime** | PvE (Đối kháng vs AI, Đi ải), Dev Sandbox | In-process trên thiết bị (cùng application game, không network) | Local storage (IndexedDB hoặc tương đương — không chốt thư viện cụ thể) | **Không**, sau khi đã tải/cache lần đầu |
| **Online Runtime** | PvP (mã phòng) | Application/server runtime (Edge Function hoặc backend service) — **không phải PostgreSQL** | PostgreSQL (Supabase), ghi qua 1 transaction/lượt do application phát ra | **Có**, bắt buộc |

**Vì sao dùng chung được:** engine ở mục 1.5 chỉ nhận input (state hiện tại + hành động) và trả output (state mới + log) một cách thuần logic ở tầng application — không tự ý đọc/ghi DB hay mở kết nối mạng bên trong chính nó, và **không chạy như một phần của PostgreSQL**. Local Runtime gọi engine rồi tự ghi kết quả vào local storage; Online Runtime gọi đúng engine đó trong application/server runtime, sau đó application mở một transaction PostgreSQL để ghi kết quả vào bảng `tran_dau`. Bản thân các quy tắc ở mục 1.5.0–1.5.5 (ATB, target, effect, victory...) **không đổi và không cần viết lại theo runtime** — chỉ khác nơi engine được gọi (in-process vs application/server runtime) và nơi state được lưu (local storage vs PostgreSQL).

| Lớp | Online Runtime (PvP) | Local Runtime (PvE) |
|---|---|---|
| CSDL | PostgreSQL (Supabase) — **chỉ persistence**, không chứa logic gameplay | Local storage trên thiết bị (IndexedDB/tương đương) |
| Nơi Shared Combat Engine thực thi | **Application/server runtime** (Edge Function hoặc backend service) | In-process trên thiết bị |
| Ghi kết quả xuống CSDL | Sau khi engine tính xong ở application, application mở **1 transaction database duy nhất/lượt** để ghi kết quả — không có trạng thái trung gian đã commit một phần. Transaction/khoá bản ghi có thể được thực hiện qua một hàm SQL (RPC) nhưng hàm đó chỉ làm nhiệm vụ ghi/khoá, không tính gameplay. Nếu application gọi nhiều lệnh ghi rời rạc, chúng bắt buộc nằm trong cùng 1 transaction thật sự (không phải "coi như cùng 1 giao dịch" ở mức business logic) | Ghi trực tiếp vào local storage bằng một thao tác ghi nguyên tử tương đương (không cần khái niệm "transaction DB" vì không có DB, nhưng vẫn phải đảm bảo không có trạng thái nửa vời nếu ứng dụng bị đóng giữa chừng — ví dụ ghi vào một bản ghi mới rồi mới commit con trỏ "trạng thái hiện tại", thay vì sửa tại chỗ) |
| Đồng bộ thời gian thực | Supabase Realtime channel — phát canonical state kèm `so_luot` sau mỗi transaction COMMIT (xem mục 2.3) | Không cần — không có đối thủ khác cần đồng bộ |
| Giao diện | React (dùng chung với Local Runtime) | React (dùng chung với Online Runtime) |
| Xác thực Dev Mode (tác giả hoá nội dung) | Edge Function kiểm tra phía server — không so sánh mật khẩu ở client | Không áp dụng cho việc **chơi** PvE; Dev Sandbox Test (mục 3.8) chạy qua Local Runtime, không cần gọi lại cổng xác thực này mỗi lần mô phỏng |
| Danh tính người chơi | Tài khoản online (`nguoi_choi`, mục 0.7.1) — bắt buộc để ghép phòng | `nguoi_choi_local_id` (UUID sinh và lưu trên thiết bị lần đầu mở app) — **không cần đăng nhập/tài khoản/authentication server** để chơi PvE |
| Nội dung Class/Skill/Effect/Ngoại hình | Đọc trực tiếp từ nguồn dữ liệu chính (Postgres) | Đọc từ **Content Bundle** đã cache local (mục 0.6a) — không query online trong lúc chơi PvE |

**Ranh giới rõ ràng:** PvE không được có bất kỳ bước nào bắt buộc gọi server để tính kết quả combat — không Internet, không Supabase, không PostgreSQL, không API server, không login, không authentication server, không realtime server. Lần đầu cài/tải game (hoặc tải Content Bundle) vẫn cần Internet hoặc một gói cài đặt đã có sẵn — đây là **cơ chế phân phối/cache**, không phải một phần của gameplay architecture; sau khi tải xong, PvE hoạt động độc lập với server.

## 0.2a Gợi ý trình tự triển khai (process, không phải gameplay — mới ở v2.0.0)

> Đây là khuyến nghị cho đội triển khai (ví dụ dùng Cursor cho engine + Lovable/Bolt cho UI), không phải yêu cầu bắt buộc về công cụ — mục đích là giảm rủi ro tích hợp giữa hai lớp đã tách biệt sẵn trong kiến trúc (mục 0.2).

1. **Xây Shared Combat Engine trước, ở dạng headless (không UI)** — thuần logic TypeScript/JavaScript đọc mục 1.5 (bao gồm 1.5.0a RNG contract), input/output là JSON (state + hành động → state mới + log), không phụ thuộc React/HTML/database thật.
2. **Viết bộ "golden fixtures"** — các file JSON cố định (content snapshot + actors ban đầu + `rng_seed` + chuỗi hành động) cùng kết quả kỳ vọng, dùng để: (a) tự động test engine trong lúc code, (b) chính là fixture cho test Local/Online equivalence đã yêu cầu ở mục 1.5.0a (OFF-08) — viết 1 lần, dùng lại cho cả hai mục đích, không cần 2 bộ test riêng.
3. **Chỉ sau khi engine pass toàn bộ fixture, mới bắt đầu lớp trình bày (UI/Local Runtime persistence/Online Runtime + Postgres + Realtime)** — import nguyên engine đã test, không viết lại logic ở lớp UI.
4. Lớp trình bày (UI) chịu trách nhiệm: Paper-doll (mục 0.9), ATB Timeline Queue (mục 1.5.0), phân nhóm hiệu ứng theo màu (mục 0.8), màn Kết quả trận (mục 1.4a), Content Bundle fetch/cache (mục 0.6a), kết nối Supabase Realtime (Phần 2) — **không được tự tính lại bất kỳ giá trị combat nào**, chỉ render canonical state nhận từ engine.

## 0.6a Content Bundle — dữ liệu data-driven vẫn tương thích offline

Nguyên tắc data-driven (Class/Skill/Nội tại/Effect/Ngoại hình là dữ liệu, không phải hằng số code — mục 0.3 #1) **không đổi**. Cái đổi là cách PvE lấy dữ liệu đó:

```text
Dev Mode (mục 3) → nguồn dữ liệu chính (Postgres, "sự thật" của mọi nội dung)
        ↓  (đóng gói khi có nội dung mới `HOAT_DONG`, gắn `phien_ban_content` tăng dần)
   Content Bundle (bản chụp Class/Skill/Nội tại/Effect registry/Ngoại hình đang HOAT_DONG)
        ↓  (tải về khi online, cache vào local storage)
   Local content đã cache trên thiết bị
        ↓
   Local Runtime đọc Content Bundle đã cache → Shared Combat Engine → PvE
```

- PvE **không** query Postgres trực tiếp để lấy Class/Skill giữa lúc chơi — luôn đọc từ bundle đã cache, đúng nguyên tắc snapshot bất biến đã có ở mục 1.5.2 (bản chụp lúc `bat_dau_tran` vẫn lấy từ bundle local, không đổi cơ chế snapshot, chỉ đổi nguồn đọc trước khi snapshot).
- Khi có Content Bundle mới hơn (`phien_ban_content` tăng) và thiết bị đang online: ứng dụng tải bản mới, thay thế bundle cũ cho các trận **mới** bắt đầu sau đó — không ảnh hưởng trận PvE đang chạy dở (đã snapshot).
- Khi thiết bị offline và bundle đã cache là bản cũ: PvE **vẫn chơi được bình thường** với nội dung đã cache — không có cảnh báo chặn, không có tính năng nào bị khoá vì "thiếu nội dung mới nhất".
- Dev Mode Sandbox Test (mục 3.8) dùng cùng cơ chế: test trên nội dung đang soạn thảo (chưa publish vào bundle chính thức) hoặc trên bundle đã cache, tùy ngữ cảnh — không tạo nguồn dữ liệu thứ ba.

**Chốt cụ thể (ADR-03, v1.9.0 — đóng NEEDS REVIEW của v1.8.0, giải quyết section 11 của final audit):** đây là quyết định kỹ thuật engineering có thể tự chốt hợp lý mà không cần chờ product; không hard-code thư viện/hạ tầng, chỉ chốt **contract**:

| Khía cạnh | Quyết định |
|---|---|
| Format | **JSON** — cùng shape với các bảng `class`/`ky_nang`/`noi_tai_class`/`hieu_ung_dinh_nghia`/`ngoai_hinh_asset`/`man_choi` đang `HOAT_DONG`, gộp thành 1 object `{ phien_ban_content, content_hash, class: [...], ky_nang: [...], noi_tai_class: [...], hieu_ung_dinh_nghia: [...], ngoai_hinh_asset: [...], man_choi: [...], cau_hinh_he_thong: {...} }`. Không chọn binary/protobuf — quy mô nội dung nhỏ (vài chục Class/Skill), JSON đủ nhanh để parse, dễ debug, không cần build step riêng. |
| Versioning | `phien_ban_content`: số nguyên tăng dần, tăng đúng 1 mỗi lần Dev Mode publish bất kỳ thay đổi nào ảnh hưởng nội dung `HOAT_DONG` (mục 3.9 đã có cơ chế publish, chỉ cần gắn version tại đó, không cần cơ chế mới). |
| Toàn vẹn dữ liệu (integrity) | `content_hash`: SHA-256 của nội dung JSON đã publish (không tính field `phien_ban_content`/`content_hash` khi băm), tính ở server lúc publish, đi kèm bundle. Local Runtime **verify hash trước khi cache** — nếu hash không khớp nội dung nhận được (lỗi tải giữa chừng), **huỷ bản tải, giữ nguyên bundle cũ đang cache**, không ghi đè. |
| Local Runtime lấy bundle từ đâu | Tải qua HTTP(S) GET một endpoint tĩnh (do Dev Mode publish ra, ví dụ file JSON trên CDN/storage công khai hoặc route của backend) — không cần giữ kết nối, không cần auth, vì bundle không chứa dữ liệu nhạy cảm (chỉ nội dung game công khai). |
| Khi nào tải | Khi ứng dụng có mạng VÀ (a) chưa từng có bundle nào được cache (bắt buộc trước lần chơi PvE đầu tiên), hoặc (b) mở app/vào Menu chính và phát hiện `phien_ban_content` trên server mới hơn bundle đang cache. Không tải giữa lúc đang chơi 1 trận PvE (đúng bất biến "không đổi content giữa trận"). |
| Bundle mismatch / tải lỗi giữa chừng | Nếu tải bị ngắt hoặc hash sai → coi như tải thất bại, giữ bundle cũ, thử lại ở lần mở app kế tiếp có mạng. Không có "bundle một nửa" được cache. |
| Engine biết dùng content version nào | Version của bundle **tại thời điểm `bat_dau_tran`** được ghi vào `du_lieu_noi_dung_snapshot.phien_ban_content` (mục 1.5.2) — thuần để debug/audit, không ảnh hưởng logic (snapshot đã bất biến, không cần biết version để chạy). |
| Combat đang chạy có bị đổi content giữa trận không | **Không** — đã có sẵn từ nguyên tắc snapshot (mục 1.5.2); tải bundle mới chỉ áp dụng cho trận **bắt đầu sau đó**. |

Đây là mức đặc tả đủ để implementation team chọn công nghệ cụ thể (nơi host file JSON, cách trigger publish) mà không cần đoán contract — không biến tài liệu này thành deployment manual.

## 0.3 Nguyên tắc kiến trúc bắt buộc

1. **Data-driven content**: Class, Nội tại Class, Skill, Hiệu ứng, Ngoại hình là dữ liệu (bảng CSDL ở nguồn chính, Content Bundle ở phía client), không phải hằng số trong code. Sau khi Dev Mode (Phần 3) hoàn thành, việc thêm nội dung mới không được yêu cầu sửa code hay chạy migration mới ở tầng engine.
2. **Shared Combat Engine chạy trên hai Runtime, không tách hai bộ luật (mục 0.2).** PvE dùng Local Runtime: Shared Combat Engine chạy in-process trên thiết bị, không gọi server, không cần Internet sau khi đã tải Content Bundle. PvP dùng Online Runtime: Shared Combat Engine chạy ở tầng **application/server runtime** (không phải PostgreSQL — xem mục 0.2), rồi application ghi kết quả xuống PostgreSQL trong một transaction nguyên tử — trình duyệt không bao giờ tự tính toán kết quả trận đấu rồi gửi lên, chỉ gửi **hành động** (chọn skill nào), engine ở tầng application/server tính và trả kết quả. Ở cả hai runtime, **client không bao giờ tự quyết định kết quả combat rồi ghi thẳng vào trạng thái coi là canonical** — khác biệt duy nhất là với PvE, "server" (tức Shared Combat Engine + local storage) chính là thiết bị của người chơi, không phải một máy chủ dùng chung, nên không có ai khác để "gian lận với" — bất biến chống-tự-sửa-kết-quả chỉ thực sự có ý nghĩa bảo mật ở PvP (nơi có đối thủ khác). **Chốt rõ (đóng blocker #9 của audit v1.5, áp dụng cho Online Runtime/PvP): client không được có quyền INSERT/UPDATE/DELETE trực tiếp lên các cột combat của `tran_dau` (`trang_thai_chien_dau`, `actor_dang_di`, `trang_thai`, `ket_qua`, `actor_ids_thang`, `nhat_ky_luot_danh`...), kể cả khi biết endpoint/UUID.** Mọi mutation combat PvP phải đi qua primitive `thuc_hien_luot_danh`/`bat_dau_tran` — về mặt implement, đây là API do application/server runtime (Edge Function) triển khai, gọi Shared Combat Engine rồi ghi PostgreSQL qua transaction (mục 0.2), **không phải một PL/pgSQL function chứa toàn bộ logic**. Nếu dùng Supabase, RLS policy trên bảng `tran_dau` phải chặn UPDATE/DELETE trực tiếp từ client role đối với các cột này, chỉ cho phép ghi qua đường application/server đã xác thực (service role hoặc `SECURITY DEFINER` chỉ dùng cho bước ghi/khoá, không chứa logic gameplay).
3. **Không có combat thời gian thực** (né đòn, phản xạ, hitbox). Toàn bộ combat là theo lượt — đúng ở cả hai runtime.
4. **Không kết nối theo IP thật**. Ghép trận PvP luôn qua mã phòng (room code) + trạng thái phòng lưu trên server (Online Runtime). PvE không có khái niệm ghép trận — không đối thủ mạng nào để kết nối tới.
5. **Combat engine data-driven, không hard-code combo Class (v1.8.0):** cấm mọi logic kiểu `IF Class X + Class Y THEN bonus` trong engine. Synergy chỉ được sinh ra từ effect, passive, chỉ số, skill, target và timing.
6. **Client không quyết định (v1.8.0):** target hợp lệ cuối cùng, chỉ số cuối (Base + Stat Allocation), sát thương, thứ tự lượt, kết quả passive và kết quả trận đều do Shared Combat Engine tính (không phải UI tự suy luận) — ở Online Runtime, đó là server; ở Local Runtime, đó là engine chạy trên chính thiết bị nhưng vẫn tách biệt khỏi lớp UI/hiển thị, theo đúng cách engine đã được thiết kế thuần logic ở mục 0.2. Mọi dữ liệu "gợi ý" (`lua_chon_hop_le`, preview chỉ số, dự báo thứ tự ATB) chỉ phục vụ hiển thị; kết quả cuối luôn do engine tính lại, không tin UI.
7. **Mở rộng, không thay kiến trúc (v1.8.0):** 3v3 mở rộng `actors[]` hiện có; vẫn một Shared Combat Engine, một transaction/lượt (Online) hoặc một ghi nguyên tử/lượt (Local), một snapshot bất biến, một registry 19 effect — dùng chung cho cả hai runtime, không nhân đôi.

## 0.4 Quy ước đặt tên

- Tên bảng, cột: `snake_case` tiếng Việt không dấu, đúng quy ước đã dùng trong dự án ERP liên quan (`nguoi_dung`, `mat_hang`...).
- Tên primitive/API cấp application: động từ_danh từ, ví dụ `tao_nhan_vat`, `thuc_hien_luot_danh`, `tao_phong_choi` — đây là tên hợp đồng (contract) ở tầng application/server runtime (mục 0.2), không nhất thiết là tên một PL/pgSQL function; phần ghi xuống PostgreSQL bên trong (nếu có) là một bước con lo persistence, không phải bản thân cái tên này.
- Mã hiệu ứng (`ma_hieu_ung`): tiếng Anh viết hoa, tiền tố `EFF_`, ví dụ `EFF_DMG_DIRECT` — dùng làm khoá tra cứu logic hiệu ứng trong engine, không đổi được qua Dev Mode (Dev Mode chỉ cấu hình tham số, không tạo loại hiệu ứng mới).

---

## 0.5 Sơ đồ màn hình (Information Architecture)

```
[Màn hình Menu chính] (màn độc lập — KHÔNG được gộp với bất kỳ màn chọn nhân vật nào)
 │
 ├─ "Chơi ngay"   (yêu cầu người chơi sở hữu ≥ 1 nhân vật; nếu chưa đủ → hiển thị lối tắt "Tạo nhân vật mới")
 │    ├─ PvP → [Ghép phòng: Tạo phòng / Nhập mã phòng]
 │    │         ├─ Đối kháng → [Chọn đội hình ra trận (1–3 nhân vật)] → [Màn trận đấu]
 │    │         └─ Cùng đi ải    → BẢO LƯU — hiển thị khoá/"Sắp ra mắt" ở v1.8.0 (mục 2.4.2)
 │    └─ PvE
 │         ├─ Đối kháng (vs đội AI) → [Chọn đội hình ra trận (1–3 nhân vật)] → [Màn trận đấu]
 │         └─ Đi ải (theo màn)      → [Chọn màn chơi] → [Chọn đội hình ra trận (1–3 nhân vật)] → [Màn trận đấu]
 │
 ├─ "Thiết lập đội hình" → [Màn Kho nhân vật] (màn quản lý, KHÔNG dùng để vào trận)
 │    ├─ Danh sách nhân vật (sửa ngoại hình / sửa skill trang bị / phân bổ lại 5 điểm)
 │    └─ "Tạo nhân vật mới" → Bước 1: Chọn Class → Bước 2: Đặt tên → Bước 3: Phân bổ 5 điểm → Bước 4: Ngoại hình → Bước 5: Trang bị skill (tối đa 4) → Xem lại & xác nhận
 │
 ├─ "Bách Thần Điện" (mới v2.1.0; hiển thị số dư Hương Hỏa hiện có ngay trên nút) → [Màn Bách Thần Điện — mục 1.4b]
 │
 ├─ "Thoát"
 │
 └─ "Dành cho nhà phát triển" (chữ nhỏ, không nổi bật)
      → [Nhập mật khẩu] → [Khu vực Dev] (đặc tả đầy đủ tại Phần 3)
```

---

## 0.5a Onboarding tối thiểu — dạy qua gameplay, không dùng tutorial dài (mới ở v1.9.1)

> **Vấn đề tìm thấy khi audit trải nghiệm người chơi:** game có ATB, MP, cooldown, CC, DOT/HOT, 19 hiệu ứng, Stat Allocation, Nội tại Class — với người chơi hoàn toàn mới, không có bất kỳ cơ chế dạy nào (v1.8.x giả định tooltip là đủ). Rủi ro thật: người chơi bối rối ngay từ lượt đầu tiên và bỏ game trước khi hiểu combat có gì hay. Giải pháp chọn là **contextual hint tối thiểu** (không phải hệ thống tutorial nhiều bước, không phải màn hình hướng dẫn dài) — đúng nguyên tắc "giải pháp nhỏ nhất tạo trải nghiệm tốt nhất".

**Nguyên tắc (UX/content, không đổi combat engine — Shared Combat Engine không biết gì về "hint", đây thuần là lớp trình bày đọc state hiện có):**
- Mỗi loại sự kiện dưới đây hiển thị **đúng 1 lần cho mỗi người chơi** (lưu cờ `da_xem_hint_X` trong local storage/`nguoi_choi_local`, không cần bảng DB mới), dạng chú thích ngắn (1-2 câu) neo cạnh phần tử liên quan, tự ẩn khi người chơi tương tác tiếp — không phải popup chặn màn hình, không bắt phải "OK" mới cho chơi tiếp:
  1. Lần đầu tiên một actor được ATB chọn đi: giải thích ngắn "Tốc độ (SPD) quyết định ai đi trước".
  2. Lần đầu tiên người chơi mở danh sách skill: giải thích MP và cooldown hiển thị ở đâu trên mỗi skill.
  3. Lần đầu tiên một skill bị khoá do cooldown/thiếu MP: giải thích ngắn tại chỗ vì sao (không chỉ disable im lặng).
  4. Lần đầu tiên một effect (buff/debuff/CC/DOT/HOT) được áp dụng lên bất kỳ actor nào: hint ngắn theo đúng **nhóm** effect (mục 0.8), không giải thích riêng từng effect trong 19 effect — ví dụ hint chung cho nhóm `KHONG_CHE` ("Actor bị khống chế không thể hành động bình thường trong vài lượt"), không phải 19 hint khác nhau.
  5. Lần đầu tiên trận kết thúc (thắng hoặc thua): hint ngắn chỉ hướng người chơi tới bảng tổng kết (mục 1.4a) thay vì chỉ hiện kết quả trần trụi.
- **Không** thêm: màn hình hướng dẫn nhiều bước bắt buộc trước khi vào trận đầu, video hướng dẫn, hệ thống nhiệm vụ dạy chơi (quest-based tutorial). Những thứ này để **Future/Post-Playtest** (mục 4.7) — chỉ làm nếu playtest thật cho thấy contextual hint không đủ.
- **Character Creation (mục 1.3) — gợi ý mặc định, không ép buộc:** ở Bước 3 (Stat Allocation) và Bước 5 (chọn skill), hiển thị một tổ hợp **"Gợi ý cho người mới"** (do Dev Mode gắn cờ `goi_y_nguoi_moi` cho 1 preset điểm + 1 preset 4 skill mỗi Class — thuần dữ liệu, không phải engine) mà người chơi có thể áp dụng bằng 1 nút bấm rồi vẫn chỉnh tay tiếp nếu muốn — giảm cảm giác "phải hiểu hết 19 effect trước khi dám bấm Tiếp tục" mà không tước quyền tự chọn.

**Không phải Must Fix nếu chi phí implement thực sự cao hơn dự kiến:** nếu hint contextual tốn công UI đáng kể hơn ước tính, mức tối thiểu chấp nhận được cho v1 là chỉ làm mục (3) và (4) ở trên (giải thích tại sao skill bị khoá + hint theo nhóm effect) — đây là hai điểm gây bối rối nhiều nhất theo đúng phân tích ở audit trải nghiệm; (1)(2)(5) có thể lùi sang playtest nếu cần cắt giảm phạm vi.

---

## 0.6 Ma trận chế độ chơi

| | PvP (mã phòng, đối thủ là người thật) | PvE (đối thủ là AI) |
|---|---|---|
| **Đối kháng** | 2 người chơi, mỗi người một đội hình **1–3 nhân vật** (không cần bằng số lượng — 1v1 đến 3v3 đều hợp lệ) | 1 người chơi (đội 1–3 nhân vật) đấu đội AI (1–3 actor tùy màn) |
| **Đi ải** | **BẢO LƯU** — Co-op tạm khoá ở v1.8.0 (mục 2.4.2) | 1 người chơi (đội 1–3 nhân vật) tự vượt màn; mỗi màn có đội AI 1–3 actor |

**Ràng buộc v1.8.0 (thay cho ràng buộc "đúng 1 nhân vật/bên" của v1.7.0 — patch cuối: bỏ luôn ràng buộc "đội người chơi luôn đúng 3" ban đầu của v1.8.0):**
- Mỗi trận có đúng **2 đội** (`DOI_A`, `DOI_B`). Mỗi đội **tối thiểu 1, tối đa 3 nhân vật/actor** — độc lập với đội đối phương. Tổng actor một trận luôn `2 ≤ actors.length ≤ 6`. Các cấu hình hợp lệ: 1v1, 1v2, 1v3, 2v1, 2v2, 2v3, 3v1, 3v2, 3v3 — dùng chung một engine combat, **không có rule riêng cho cấu hình lệch quân số** (ví dụ 1v3 không có handicap/hệ số bù trừ nào).
- Người chơi chỉ cần sở hữu **≥ 1 nhân vật** để vào trận (không bắt buộc đủ 3). Một đội hình không được chứa cùng một `nhan_vat_id` hai lần; **được phép trùng Class** (không có luật "mỗi Class một lần").
- **Không có role bắt buộc** (Tank/Healer/DPS). Cấu trúc đội là *emergent* từ Class + Passive + Skill + Stat (xem 0.13).
- **Không thêm handicap/damage multiplier/stat multiplier** cho đội có ít actor hơn — nếu 1v3 mất cân bằng, đó là vấn đề playtest/balance ghi ở mục 4.7/4.8, không tự thêm cơ chế bù trừ vào v1.8.0.
- Đội hình tối đa 3 nhân vật/đội, không có nhiều hơn 2 đội/trận, không hệ thống party/matchmaking tự động ở v1.8.0.

---

## 0.7 Mô hình dữ liệu đầy đủ

> **Local-first vs Online-only (mục 0.2):** mỗi bảng dưới đây được gắn nhãn phạm vi lưu trữ ngay sau tên bảng. **[LOCAL-FIRST]** = tồn tại và đủ để chơi PvE trên local storage của thiết bị, không bắt buộc có bản ghi phía server; đây là dữ liệu Content Bundle (Class/Skill/Effect/Ngoại hình) hoặc dữ liệu sở hữu bởi `nguoi_choi_local_id`. **[ONLINE-ONLY]** = chỉ tồn tại/áp dụng khi chơi PvP hoặc khi tác giả hoá nội dung qua Dev Mode, luôn ở Postgres (Supabase). **[DÙNG CHUNG]** = cùng một cấu trúc dữ liệu, nhưng nơi lưu khác nhau theo runtime đang dùng nó (Local storage cho PvE, Postgres cho PvP) — không phải hai schema khác nhau, chỉ khác backend lưu trữ.

### 0.7.0 `nguoi_choi_local` [LOCAL-FIRST] — mới, danh tính người chơi PvE không cần tài khoản

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| nguoi_choi_local_id | uuid | ✔ | Sinh một lần trên thiết bị khi mở app lần đầu (không cần server cấp), lưu local, tồn tại vĩnh viễn trên thiết bị đó. Là khoá sở hữu cho toàn bộ `nhan_vat`, `tien_do_di_ai`, save PvE local — thay cho `nguoi_choi_id` khi chơi PvE offline |
| ten_hien_thi_local | text | | Tuỳ chọn, chỉ hiển thị local, không đồng bộ online |
| ngay_tao | timestamp | ✔ | |
| da_nhan_trieu_hoi_khoi_dau | boolean | ✔ | `DEFAULT false`. Gói 10 lượt Triệu Hồi Khởi Đầu chỉ được nhận đúng 1 lần trên thiết bị; khi hoàn tất toàn bộ gói thì chuyển `false→true` trong cùng thao tác nguyên tử với việc tạo các Hero nhận được |

**Quyết định v2.1.0 (ADR-02):** `nguoi_choi_local_id` là chủ sở hữu duy nhất của roster nhân vật, dùng cho **cả PvE và PvP**. Vào PvP, client gửi bản khai nhân vật; server chỉ kiểm tra hợp lệ (mục 2.2). `nguoi_choi.id` (PvP) chỉ là danh tính phòng và **không sở hữu nhân vật**. Không có liên kết/đồng bộ tài khoản↔roster vì không có gì để liên kết.

### 0.7.1 `nguoi_choi` [ONLINE-ONLY] — danh tính phòng PvP (phiên ẩn danh), KHÔNG cần cho PvE

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | = `auth.uid()` của phiên ẩn danh (ADR-10) |
| ten_hien_thi | text | ✔ | 1–24 ký tự Unicode, không ký tự điều khiển; người chơi nhập ở lần đầu vào PvP, sửa được sau |
| ngay_tao | timestamp | ✔ | |

Không có `ten_dang_nhap`/`mat_khau_hash`. Người chơi chỉ đọc/ghi hàng của chính mình (RLS). Mất phiên = danh tính mới, không ảnh hưởng roster (nằm ở local).

### 0.7.2 `dev_settings` [ONLINE-ONLY] — cổng tác giả hoá nội dung, không phải cổng chơi PvE

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | int | ✔ | Luôn đúng 1 dòng |
| mat_khau_hash | text | ✔ | Băm; giá trị khởi tạo tương ứng mật khẩu khởi tạo được cấu hình khi triển khai (không hard-code trong source; nếu môi trường dev dùng giá trị mặc định thì phải đổi ngay sau lần đăng nhập đầu) |
| cap_nhat_luc | timestamp | ✔ | |

### 0.7.3 `class` [DÙNG CHUNG — nguồn chính Postgres, PvE đọc qua Content Bundle đã cache local]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| ma_class | text | ✔ | Duy nhất, viết hoa không dấu |
| ten_hien_thi | text | ✔ | |
| mo_ta | text | | |
| icon_url | text | | |
| hp_nen | int | ✔ | Chỉ số máu nền |
| atk_nen | int | ✔ | |
| def_nen | int | ✔ | |
| spd_nen | int | ✔ | Bắt buộc > 0 — dùng làm tốc độ tích gauge ATB (mục 1.5.0), SPD = 0 khiến actor không bao giờ tới lượt |
| mp_nen | int | ✔ | MP tối đa nền |
| mp_hoi_moi_luot | int | ✔ | Lượng MP hồi mỗi khi đến lượt actor đó, trước khi chọn skill |
| trang_thai | enum(`HOAT_DONG`,`AN`) | ✔ | Ẩn = không hiển thị cho người chơi chọn, không xoá cứng |
| phan_loai | enum(`THUONG`,`LINH_THAN`) | ✔ | `DEFAULT 'THUONG'`. `THUONG` = archetype người chơi chọn khi tạo nhân vật; `LINH_THAN` = thực thể SSS cố định, chỉ có được bằng Hương Hỏa (mục 0.8.6.B) |
| ten_co_dinh | text | | Bắt buộc khi `LINH_THAN` hoặc `la_hero_preset=true` (ví dụ "Sơn Tinh", "Thủy Tinh"). NULL khi `THUONG` tự tạo. Tên cố định của Hero/Linh Thần |
| ngoai_hinh_co_dinh | jsonb | | Bắt buộc khi `LINH_THAN` hoặc `la_hero_preset=true`: `{gioi_tinh, mau_da_id, toc_id, mat_id, ao_id, quan_id, trang_suc_id}`; NULL khi `THUONG` tự tạo |
| goi_y_phan_bo | jsonb | | Tuỳ chọn, gợi ý cho người mới: `{"hp":..,"atk":..,"def":..,"spd":..,"mp":..,"mp_hoi":..}` tổng 5, ≤2/stat. Thiếu → dùng mặc định `{hp:1,atk:1,def:1,spd:1,mp:1,mp_hoi:0}` |
| goi_y_ky_nang | jsonb | | Tuỳ chọn: mảng 1–4 `ky_nang_id` thuộc Class. Thiếu → 4 skill `HOAT_DONG` đầu tiên theo `ma_ky_nang` tăng dần |
| la_hero_preset | boolean | ✔ | `DEFAULT false`. `true` chỉ cho Class `THUONG` đã được tác giả hoá sẵn; Hero preset có thể có tier `B/A/S/SS`. Class tự tạo của người chơi luôn `false` |

**Ràng buộc `phan_loai`:** `LINH_THAN` ⇒ `ten_co_dinh` và `ngoai_hinh_co_dinh` không NULL, có ≥ 4 skill `HOAT_DONG`; `THUONG` + `la_hero_preset=true` ⇒ cũng có `ten_co_dinh` và `ngoai_hinh_co_dinh` để Hero giữ danh tính/ngoại hình cố định; `THUONG` + `la_hero_preset=false` ⇒ cả hai NULL. Luồng tạo nhân vật (mục 1.3) và pool roll tier chỉ dùng Class `THUONG`. Ràng buộc SPD ≤ 2.0 bên dưới áp dụng cho **mọi** Class `HOAT_DONG` kể cả `LINH_THAN`.

**Ràng buộc gameplay:** mỗi `class` phải có đúng **1 `noi_tai_class`** khi `trang_thai = HOAT_DONG`. Class `AN` vẫn phải giữ passive nếu đã từng được dùng, để không phá dữ liệu lịch sử/trận cũ.

**Ràng buộc cân bằng v1.8.0 (Dev Mode validate cả client lẫn server):**
- Tỉ lệ `spd_nen` giữa mọi Class `HOAT_DONG` phải thỏa `MAX(spd_nen) / MIN(spd_nen) ≤ 2.0` (hằng số `TY_LE_SPD_TOI_DA`). Đây là "SPD budget" của Class: khoảng cách tốc độ giữa hai Class bị chặn ngay từ dữ liệu gốc, thay vì để công thức tự giảm chỉ số khác (không dùng cơ chế "SPD nền cao → tự giảm ATK/DEF/HP"; trade-off của Class do Dev thiết kế trực tiếp vào chỉ số nền).
- Khuyến nghị thang chỉ số (cảnh báo, không chặn): `spd_nen ≥ 100`, `hp_nen ≥ 300`, `atk_nen ≥ 50` để hệ số quy đổi Stat Allocation (mục 0.8.4) không bị méo do làm tròn.
- Các cột `*_nen` là chỉ số **nền của Class**; chỉ số **cuối** dùng trong combat = (nền × hệ số tier cho HP/ATK/DEF) + Stat Allocation (mục 0.8.4).

### 0.7.4 `noi_tai_class` [DÙNG CHUNG — nguồn chính Postgres, PvE đọc qua Content Bundle] — Nội tại riêng của Class

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | Khoá chính |
| class_id | uuid ref(class) | ✔ | **UNIQUE** — mỗi Class chỉ có đúng 1 nội tại hoạt động trong v1.7.0 |
| ma_noi_tai | text | ✔ | Duy nhất, viết hoa không dấu |
| ten_hien_thi | text | ✔ | Tên nội tại hiển thị cho người chơi |
| mo_ta | text | ✔ | Mô tả bằng tay, không tự sinh |
| icon_url | text | | |
| kich_hoat | enum(`BAT_DAU_TRAN`,`BAT_DAU_LUOT`,`KHI_SU_DUNG_SKILL`,`KHI_GAY_SAT_THUONG`,`KHI_NHAN_SAT_THUONG`) | ✔ | Sự kiện làm nội tại được kiểm tra/thực thi |
| dieu_kien | jsonb | | Điều kiện tùy chọn, ví dụ `{"loai":"HP_PCT_NHO_HON_BANG","gia_tri":50}`; nếu không có điều kiện thì `{}` |
| danh_sach_hieu_ung | jsonb | ✔ | Mảng có thứ tự, **1–2 effect**; dùng lại registry 19 effect, không tạo effect mới |
| trang_thai | enum(`HOAT_DONG`,`AN`) | ✔ | Ẩn = không áp dụng cho trận mới; không xoá cứng |
| dac_trung_rieng | boolean | ✔ | `DEFAULT false`. **Mới ở v2.3.0.** Đánh dấu đây là đặc điểm được tác giả xác nhận là "nhận diện riêng" của Class — bắt buộc đúng cặp với `class.phan_loai = LINH_THAN` (mục 0.8.4.G) |

**Nguyên tắc:** Nội tại là đặc tính của Class, không chiếm một ô trong `ky_nang_trang_bi` và không cần người chơi chọn/bấm. Một Class có thể có 1 hoặc 2 effect làm nên bản sắc nội tại, nhưng **không bắt buộc** mọi skill của Class phải chứa cùng effect.

**Ràng buộc server:** `class_id` là duy nhất; nội tại phải thuộc Class tương ứng; tối đa 2 effect; mỗi effect phải tồn tại trong registry, tham số hợp lệ, target hợp lệ và trigger/điều kiện được engine hỗ trợ.

**Ràng buộc bổ sung v1.8.0:** `doi_tuong` của mọi effect trong `danh_sach_hieu_ung` của nội tại phải thuộc `{BAN_THAN, TAT_CA_DICH, TAT_CA_DONG_DOI, NGAU_NHIEN_N_DICH}`. `MOT_DICH` và `MOT_DONG_DOI` bị **reject** vì nội tại không có bước nhận input chọn target — ở 1v1 hai giá trị này từng tự resolve, ở 3v3 chúng trở nên mơ hồ. Ngữ nghĩa thực thi đầy đủ: mục 0.8.2.

### 0.7.5 `hieu_ung_dinh_nghia` [LOCAL-FIRST — hằng số đóng gói sẵn trong ứng dụng, không cần tải] (registry cố định — xem đầy đủ tại mục 0.8)

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| ma_hieu_ung | text | ✔ | Khoá chính, ví dụ `EFF_DMG_DIRECT` |
| ten_hien_thi | text | ✔ | |
| nhom | enum(`SAT_THUONG`,`KHONG_CHE`,`BUFF`,`DEBUFF`,`HOI_PHUC`,`TIEN_ICH`) | ✔ | |
| tham_so_schema | jsonb | ✔ | Danh sách tham số cấu hình được và kiểu dữ liệu, ví dụ `[{"ten":"he_so","kieu":"decimal"},{"ten":"so_luot","kieu":"int"}]` |
| doi_tuong_mac_dinh | enum | ✔ | Xem enum đối tượng ở mục 0.7.6 |
| thoi_diem_kha_dung | jsonb | ✔ | Danh sách thời điểm áp dụng được phép (mảng enum thời điểm) |

Bảng này **được seed sẵn ở Phần 1, không sửa được qua Dev Mode** — Dev Mode chỉ dùng các dòng có sẵn để cấu hình tham số khi tạo skill.

### 0.7.6 `ky_nang` [DÙNG CHUNG — nguồn chính Postgres, PvE đọc qua Content Bundle]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| ma_ky_nang | text | ✔ | Duy nhất |
| ten_hien_thi | text | ✔ | |
| mo_ta | text | ✔ | **Nhập tay bởi người tạo skill, không tự sinh từ hiệu ứng** |
| icon_url | text | | |
| class_id | uuid ref(class) | ✔ | Skill thuộc về đúng 1 class |
| hoi_chieu_luot | int | ✔ | Số lượt phải chờ trước khi dùng lại |
| chi_phi_mp | int | ✔ | MP tiêu tốn khi dùng skill này; 0 nếu skill không tốn MP. Server từ chối hành động nếu `mp_hien_tai` của actor < giá trị này |
| danh_sach_hieu_ung | jsonb | ✔ | Mảng có thứ tự, mỗi phần tử: `{"ma_hieu_ung","tham_so":{...},"doi_tuong","thoi_diem"}` — **thứ tự trong mảng quyết định thứ tự áp dụng khi thi triển** |
| dac_trung_rieng | boolean | ✔ | `DEFAULT false`. **Mới ở v2.3.0.** Như `noi_tai_class.dac_trung_rieng` — xem luật validate ở mục 0.8.4.G |
| trang_thai | enum(`HOAT_DONG`,`AN`) | ✔ | |

### 0.7.7 Enum dùng chung

**Đối tượng (`doi_tuong`)**: `BAN_THAN`, `MOT_DICH`, `TAT_CA_DICH`, `MOT_DONG_DOI`, `TAT_CA_DONG_DOI`, `NGAU_NHIEN_N_DICH`.

**Thời điểm (`thoi_diem`)**: `KHI_THI_TRIEN`, `KHI_DANH_TRUNG`, `BI_DONG_DAU_TRAN`.

### 0.7.8 `ngoai_hinh_asset` [DÙNG CHUNG — nguồn chính Postgres, PvE đọc qua Content Bundle]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| danh_muc | enum(`TOC`,`MAT`,`AO`,`QUAN`,`TRANG_SUC`) | ✔ | |
| ten_hien_thi | text | ✔ | |
| hinh_anh_url | text | ✔ | Ảnh gốc không tint sẵn màu da (xem mục 9) |
| gioi_tinh_tuong_thich | enum(`NAM`,`NU`,`CA_HAI`) | ✔ | |
| thu_tu_lop | int | ✔ | Z-index/layer để điều chỉnh thứ tự vẽ linh hoạt khi asset cần nằm trước/sau lớp khác |
| trang_thai | enum(`HOAT_DONG`,`AN`) | ✔ | |

### 0.7.9 `mau_da_preset` [DÙNG CHUNG — nguồn chính Postgres, PvE đọc qua Content Bundle]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| ten_hien_thi | text | ✔ | |
| gia_tri_tint | text | ✔ | Giá trị dùng cho bộ lọc màu (CSS filter hoặc mã màu overlay) |

### 0.7.10 `nhan_vat` [LOCAL-FIRST — sở hữu bởi `nguoi_choi_local_id`; dùng cho cả PvE lẫn PvP qua bản khai, xem ADR-02]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | Sinh ở client khi tạo; chỉ là nhãn trong log (danh tính actor trong trận là `actor_id`) |
| nguoi_choi_local_id | uuid ref(nguoi_choi_local) | ✔ | Khoá sở hữu (local storage trên thiết bị) |
| class_id | uuid ref(class) | ✔ | |
| tier | enum(`C`,`B`,`A`,`S`,`SS`,`SSS`) | ✔ | `DEFAULT 'B'`. `CHECK`: nếu `class.phan_loai = LINH_THAN` thì `tier = 'SSS'`; nếu `class.phan_loai = THUONG` và `class.la_hero_preset = true` thì `tier IN ('B','A','S','SS')`; nếu `class.phan_loai = THUONG` và `class.la_hero_preset = false` thì `tier IN ('B','A','S')`. **`C` không bao giờ xuất hiện ở `nhan_vat`**; `SS` chỉ dành cho Hero preset. Tier của Hero preset là cố định theo seed; tier của nhân vật tự tạo roll một lần khi lưu và không đổi sau khi tạo.` |
| ten_nhan_vat | text | ✔ | `THUONG`: người chơi đặt ở Bước 2, trim, **1–24 ký tự Unicode**, không ký tự điều khiển, không bắt buộc duy nhất. `LINH_THAN`: = `class.ten_co_dinh`, không sửa được |
| gioi_tinh | enum(`NAM`,`NU`) | ✔ | `LINH_THAN`: sao chép từ `ngoai_hinh_co_dinh`, không sửa được |
| mau_da_id | uuid ref(mau_da_preset) | ✔ | như trên |
| toc_id | uuid ref(ngoai_hinh_asset) | ✔ | như trên |
| mat_id | uuid ref(ngoai_hinh_asset) | ✔ | như trên |
| ao_id | uuid ref(ngoai_hinh_asset) | ✔ | như trên |
| quan_id | uuid ref(ngoai_hinh_asset) | ✔ | như trên |
| trang_suc_id | uuid ref(ngoai_hinh_asset) | | Có thể để trống |
| ky_nang_trang_bi | jsonb | ✔ | Mảng 1–4 `ky_nang_id`, đều thuộc đúng `class_id`, đều `HOAT_DONG` — kiểm tra ở tầng ứng dụng, không chỉ UI |
| diem_hp | int | ✔ | Stat Allocation, `DEFAULT 0`, `CHECK (0 ≤ diem_hp ≤ 2)` — mục 0.8.4 |
| diem_atk | int | ✔ | như trên |
| diem_def | int | ✔ | như trên |
| diem_spd | int | ✔ | như trên |
| diem_mp | int | ✔ | như trên |
| diem_mp_hoi | int | ✔ | Điểm vào `mp_hoi_moi_luot` (MP Regen); như trên |
| ngay_tao | timestamp | ✔ | |

**Ràng buộc bắt buộc**: mọi `ky_nang_id` thuộc đúng `class_id`; `tier` khớp `class.phan_loai` như trên; kiểm tra lại ở tầng ứng dụng khi lưu và ở `bat_dau_tran`, không chỉ tin UI.

**Ràng buộc Stat Allocation:** `CHECK (diem_hp + diem_atk + diem_def + diem_spd + diem_mp + diem_mp_hoi IN (0, 5))`. Tổng `0` chỉ dành cho nhân vật legacy chưa phân bổ (mục 4.6); mọi thao tác tạo/sửa (`tao_nhan_vat`, `cap_nhat_phan_bo`) bắt buộc tổng **đúng 5**, mỗi stat 0–2, số nguyên; vi phạm → từ chối toàn bộ, không lưu một phần. **Chỉ số cuối không lưu vào `nhan_vat`** (dữ liệu dẫn xuất): hàm `tinh_chi_so_cuoi` (mục 0.8.4) tính và chụp vào snapshot lúc `bat_dau_tran`.

**Xoá nhân vật:** cho phép xoá nhân vật `THUONG` (xác nhận 2 bước). **Không xoá được** nhân vật `LINH_THAN` (bản mở khoá là vĩnh viễn, chỉ được respec và đổi skill). Xoá không ảnh hưởng lịch sử trận vì log tự mô tả bằng snapshot.

### 0.7.11 `phong_choi` [ONLINE-ONLY]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| ma_phong | text | ✔ | Mã ngắn, duy nhất, dễ đọc để chia sẻ (ví dụ 6 ký tự) |
| che_do | enum(`DOI_KHANG`,`DI_AI_CUNG_NHAU`) | ✔ | `DI_AI_CUNG_NHAU` được **bảo lưu** trong enum nhưng server từ chối tạo phòng loại này ở v1.8.0 (mục 2.4.2) |
| trang_thai | enum(`CHO_NGUOI_CHOI_2`,`SAN_SANG`,`DANG_CHOI`,`KET_THUC`,`DA_HUY`) | ✔ | Xem state machine mục 10 |
| nguoi_tao_id | uuid ref(nguoi_choi) | ✔ | |
| nguoi_choi_2_id | uuid ref(nguoi_choi) | | Trống cho đến khi có người tham gia |
| doi_hinh_nguoi_tao | jsonb | | Mảng **1–3 bản khai nhân vật** (`nhan_vat_payload`, mục 2.2) theo thứ tự vị trí do người tạo phòng xác nhận; server đã kiểm tra hợp lệ trước khi lưu; `null` cho tới khi xác nhận. Các `nhan_vat_id` trong cùng một đội hình phải phân biệt; khác đội được phép trùng (bản sao save) vì danh tính actor là `actor_id` |
| doi_hinh_nguoi_2 | jsonb | | Như trên, của người chơi thứ hai |
| che_do_tier | enum(`CAN_BANG`,`TU_DO`) | ✔ | `DEFAULT 'CAN_BANG'`. Người tạo phòng chọn lúc tạo, **bất biến** sau đó; người vào phòng thấy luật trước khi xác nhận đội hình. **`CAN_BANG`: vô hiệu các hệ số stat do tier mang lại** (mọi actor tính `he_so_tier=1.00`, kể cả SSS) — **KHÔNG vô hiệu Nội tại/skill/kit riêng của Linh Thần** (ADR-08: Layer 2 luôn giữ nguyên). `TU_DO`: áp hệ số tier đầy đủ (Layer 1 + Layer 2). Cả hai chế độ đều giữ trần `so_linh_than_toi_da_moi_doi` (mục 1.4). Xem ADR-08, mục 2.2 |
| ngay_tao | timestamp | ✔ | |

### 0.7.12 `man_choi` [DÙNG CHUNG — cấu hình do Dev Mode tác giả hoá, PvE đọc qua Content Bundle]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| thu_tu | int | ✔ | Thứ tự trong chuỗi Đi ải |
| ten_man | text | ✔ | |
| cau_hinh_ai | jsonb | ✔ | Đội AI của màn này — cấu trúc `doi_ai[]` bên dưới |
| huong_hoa_first_clear | int | ✔ | `DEFAULT 0`, `CHECK ≥ 0`. Hương Hỏa nhận **đúng một lần** khi thắng màn này lần đầu (mục 0.8.6) |
| trang_thai | enum(`HOAT_DONG`,`AN`) | ✔ | |

**Cấu trúc `cau_hinh_ai` (v1.8.0):**

```json
{
  "doi_ai": [
    {
      "class_id": "uuid-...",
      "ky_nang_ids": ["uuid-...", "uuid-...", "uuid-...", "uuid-..."],
      "phan_bo_diem": { "hp": 2, "atk": 2, "def": 0, "spd": 1, "mp": 0, "mp_hoi": 0 },
      "tier": "B",
      "ai_archetype": "AGGRESSIVE"
    }
  ]
}
```

`doi_ai` có **1–3 phần tử** (thứ tự = vị trí B1→B3). Class cung cấp chỉ số nền + Nội tại; **cùng luật validate như nhân vật người chơi**: skill phải thuộc đúng Class, tối đa 4 skill, `phan_bo_diem` tổng đúng 5 và ≤ 2/stat, **`tier` cho Class `LINH_THAN` bắt buộc `SSS`; cho Class `THUONG` dùng được toàn bộ `{C, B, A, S, SS}` (mặc định `B`) — đây là núm chỉnh độ khó theo màn bằng dữ liệu thuần tuý (màn đầu seed AI tier `C`, màn cuối seed `SS`), không cần cơ chế difficulty mới, và là lý do duy nhất tier `C`/`SS` tồn tại trong schema (ADR-09)**, `ai_archetype ∈ {AGGRESSIVE, CONTROL, DEFENSIVE, ADAPTIVE}` (mục 1.5.4). Đội AI của PvE Đối kháng dùng cùng cấu trúc, lấy từ dữ liệu seed cố định (mục 1.6.1).

### 0.7.13 `tien_do_di_ai` [LOCAL-FIRST — theo `nguoi_choi_local_id`]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| nguoi_choi_local_id | uuid ref(nguoi_choi_local) | ✔ | |
| man_choi_id | uuid ref(man_choi) | ✔ | |
| da_hoan_thanh | boolean | ✔ | `DEFAULT false`. Chuyển `false → true` đúng một lần tại first-clear (idempotent) |
| hoan_thanh_luc | timestamp | | |
| | | | **Khoá chính ghép:** (`nguoi_choi_local_id`, `man_choi_id`) |

Bảng này lưu tiến độ Đi ải và các cờ nhận thưởng; không suy ra từ `tran_dau` mỗi lần mở danh sách màn.

### 0.7.13a `vi_huong_hoa` [LOCAL-FIRST — mới ở v2.1.0]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| nguoi_choi_local_id | uuid ref(nguoi_choi_local) | ✔ | Khoá chính |
| so_du | int | ✔ | `DEFAULT 0`, `CHECK ≥ 0` |
| linh_than_da_mo | jsonb | ✔ | `DEFAULT []`. Mảng `class_id` Linh Thần đã mở, không trùng; chỉ được thêm |

**Nhất quán ví (`INV-HH-2`):** `so_du = Σ(thưởng đã nhận theo các cờ trong tien_do_di_ai) − chi_phi_linh_than × (số Linh Thần đã mở)` và `so_du ≥ 0`. Ứng dụng có hàm `kiem_tra_vi()` (dùng cho QA/Sandbox) báo lệch; **không tự sửa im lặng** vì lệch chỉ xảy ra khi người chơi tự sửa dữ liệu (mục 0.8.6.H).

### 0.7.13b `cau_hinh_he_thong` [DÙNG CHUNG — 1 dòng, nằm trong Content Bundle, mới ở v2.1.0]

Một dòng jsonb, seed khi triển khai và phát hành qua Content Bundle (đổi số = tăng `phien_ban_content`, không đổi code):

```json
{
  "he_so_tier": { "C": 0.94, "B": 1.00, "A": 1.04, "S": 1.08, "SS": 1.13, "SSS": 1.22 },
  "trong_so_tier_tao_moi": { "B": 60, "A": 30, "S": 10 },
  "chi_phi_linh_than": 300,
  "chi_phi_hero_huong_hoa": { "B": 15, "A": 30, "S": 50, "SS": 80 },
  "so_linh_than_toi_da_moi_doi": 1,
  "trieu_hoi_khoi_dau": {
    "so_luot": 10,
    "bao_dam_toi_thieu": "S",
    "bao_dam_toi_thieu_lan_hai": "A",
    "pool": "HERO_PRESET_B_A_S_SS",
    "lap_lai": false
  }
}
```

`he_so_tier` có đủ **6 khoá** (ladder đầy đủ C/B/A/S/SS/SSS). `trong_so_tier_tao_moi` vẫn chỉ dùng 3 khoá `B/A/S` cho nhân vật tự tạo; `C` chỉ dành cho AI, còn `SS` nay được dùng cho **Hero preset** và AI. Bước nhảy `SS→SSS` (+9 điểm %, sửa lại ở v2.3.0 sau balance audit — trước là +14) vẫn lớn hơn rõ rệt mọi bước nhảy khác trong ladder (`C→B` +6, `B→A` +4, `A→S` +4, `S→SS` +5) — đây là **Layer 1** của khác biệt SSS; Layer 2 (kit, nay là điều kiện bắt buộc) ở mục 0.8.4.G. `trong_so_tier_tao_moi` tổng đúng 100 và **không có khoá `C`/`SS`/`SSS`** vì bảng này chỉ dành cho nhân vật tự tạo; Hero preset có tier seed riêng trong Class. Dev Mode chưa có màn sửa bảng này ở v2.1.0 (đổi qua seed/migration rồi phát hành bundle); toàn bộ giá trị số trong bảng này là ⚠️ **PLAYTEST-VERIFIABLE — BALANCE SEED** (mục 0.8.6.I), không phải invariant kiến trúc.

---

### 0.7.14 `tran_dau` [DÙNG CHUNG — cấu trúc giống hệt nhau; PvE lưu local theo `nguoi_choi_local_id`, PvP lưu Postgres theo `phong_choi`]

| Cột | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| id | uuid | ✔ | |
| loai | enum(`PVE_DOI_KHANG`,`PVE_DI_AI`,`PVP_DOI_KHANG`,`PVP_DI_AI_CUNG_NHAU`) | ✔ | `PVP_DI_AI_CUNG_NHAU` được bảo lưu trong enum nhưng `bat_dau_tran` từ chối ở v1.8.0 (mục 2.4.2) |
| phong_choi_id | uuid ref(phong_choi) | | Chỉ có với loại PVP |
| man_choi_id | uuid ref(man_choi) | | Chỉ có với loại liên quan Đi ải |
| nguoi_choi_ids | jsonb | ✔ | PvP: mảng `nguoi_choi.id` tham gia. PvE: mảng chỉ chứa `nguoi_choi_local_id` của thiết bị đang chơi — không có tài khoản online liên quan |
| nhan_vat_ids | jsonb | ✔ | Mảng nhãn `nhan_vat_id` của các actor do người chơi điều khiển, theo thứ tự actor (A1→A{độ dài đội A} rồi B1→B{độ dài đội B}, bỏ qua actor AI); **1–6 phần tử**. Chỉ là nhãn tra cứu — danh tính actor là `actor_id` |
| trang_thai | enum(`DANG_DIEN_RA`,`KET_THUC`) | ✔ | |
| ket_qua | enum(`CO_BEN_THANG`,`HOA`) | | Chỉ có khi `KET_THUC`. Chỉ phân biệt "có đội thắng" hay "hòa"; **đội nào** thắng nằm ở `actor_ids_thang` (không suy ngược từ log) |
| actor_ids_thang | jsonb | | Mảng `actor_id` của **mọi actor thuộc đội thắng, kể cả actor đã chết trước đó** (tối đa 3 phần tử; đội AI 1–3 phần tử). Rỗng `[]` nếu `ket_qua = HOA`. Client so `actor_id`/`nguoi_choi_id` của người dùng hiện tại với mảng này để hiển thị "Bạn thắng/Bạn thua" — không có field nào mang nghĩa tương đối theo góc nhìn một người chơi |
| trang_thai_chien_dau | jsonb | ✔ | Trạng thái combat hiện tại — mảng `actors[]` **tối đa 6 phần tử**, mỗi actor gắn `doi`, `vi_tri`, `dieu_khien`; cấu trúc đầy đủ ở mục 1.5.1 |
| du_lieu_noi_dung_snapshot | jsonb | ✔ | Bản sao **bất biến** dữ liệu combat của từng actor chốt tại `bat_dau_tran` (mục 1.5.2): chỉ số nền Class, **`tier` + hệ số tier đã áp dụng (1.00 nếu phòng `CAN_BANG`), Stat Allocation + hệ số quy đổi + chỉ số cuối**, Nội tại Class, định nghĩa skill trang bị. Engine không đọc lại bảng sống trong suốt trận |
| nhat_ky_luot_danh | jsonb | ✔ | Mảng các lượt đánh. **Mở rộng ở v1.6 (đóng blocker #16 của audit v1.5):** mỗi phần tử ghi actor, hành động (skill/BỎ_LƯỢT/TIMEOUT), `target_actor_id` đã resolve, MP tiêu tốn, `so_luot` (version) tại lượt đó, timestamp (server cho PvP, đồng hồ thiết bị cho PvE), và một mảng con `hieu_ung_ap_dung[]` liệt kê **theo đúng thứ tự thực thi**: mỗi phần tử gồm `ma_hieu_ung`, target thực tế của effect đó, giá trị thực tế áp dụng (sát thương/hồi máu/gia_tri buff-debuff), và cờ `bi_bo_qua` (+ lý do, ví dụ "target đã chết") nếu effect đó không được áp dụng. `EFF_LIFESTEAL` ghi thêm lượng HP mất thực sự của mục tiêu mà nó dựa vào để tính hồi máu. Mục tiêu: debug được một trận chỉ bằng cách đọc log, không cần đoán. **Mở rộng v1.8.0:** mỗi phần tử ghi thêm `actor_doi`, `ten_hien_thi_actor` (tên nhân vật/Class chụp từ snapshot — cấm log kiểu "Character 2" không rõ đội), `ly_do_bo_luot` (`CHU_DONG`/`BI_STUN`/`BI_SILENCE`/`KHONG_DU_MP`, chỉ khi hành động là BỎ_LƯỢT), `so_lua_chon_hop_le` (số lựa chọn có nghĩa của actor đầu lượt — nguồn cho metric Decision Density), `passive_kich_hoat[]` (actor, passive, trigger), `actor_chet[]` (các actor chết trong lượt, theo thứ tự); mỗi phần tử `hieu_ung_ap_dung[]` ghi thêm `nguon` (`SKILL`/`NOI_TAI`/`DOT_HOT`), `target_actor_id`, `target_doi`. |
| bat_dau_luc | timestamp | ✔ | |
| ket_thuc_luc | timestamp | | |
| phien_ban_engine | text | ✔ | `'2.1.0'` cho trận mới (bắt đầu tính hệ số tier); trận tạo ở v1.8.x mang `'1.8.0'`, bản ghi cũ hơn `'1.7.0'` (mục 4.6) để UI/log biết cách đọc `actors[]` cũ |
| ket_qua_tien_trinh | jsonb | | **Chỉ PvE Đi ải, chỉ khi `KET_THUC`.** `{"huong_hoa_nhan": int, "first_clear": bool}` ghi trong **cùng giao dịch** kết thúc trận (mục 0.8.6.D). Màn Kết quả chỉ **đọc** field này, không tính lại → reload/khởi động lại không cấp lại và không mất thông báo. PvE Đối kháng và PvP: luôn `null` |
| che_do_tier | enum(`CAN_BANG`,`TU_DO`) | ✔ | PvP: sao chép từ phòng lúc `bat_dau_tran`. PvE: luôn `TU_DO` |

---

## 0.8 Registry hiệu ứng chuẩn (19 hiệu ứng — seed cố định ở Phần 1)

**Yêu cầu UI bắt buộc cho hiển thị effect (mới ở v2.0.0 — presentation-only, dùng đúng field `Nhóm` đã có sẵn trong bảng dưới, không đổi registry):** để giảm information-overload khi nhiều effect cùng hiển thị trên 1 actor (tối đa vài effect cùng lúc trong 3v3), client phải phân cụm màu theo đúng 3 nhóm hiển thị sau (ánh xạ từ cột "Nhóm" bên dưới, không tạo phân loại mới):
- **Có lợi** (`BUFF`, `HOI_PHUC`, `TIEN_ICH` khi tác dụng lên đồng minh) → 1 màu (ví dụ xanh dương).
- **Bất lợi** (`DEBUFF`, `SAT_THUONG` dạng DOT đang tồn tại trên actor) → 1 màu khác (ví dụ đỏ).
- **Khống chế** (`KHONG_CHE`: STUN/SILENCE/ROOT/SLOW) → màu thứ 3, **nổi bật hơn 2 nhóm còn lại** (kích thước icon lớn hơn hoặc có hiệu ứng nhấp nháy) — vì đây là nhóm duy nhất trực tiếp tước quyền hành động của actor, người chơi cần nhận ra ngay lập tức, không được để lẫn với buff/debuff thường.

| Mã (`ma_hieu_ung`) | Tên hiển thị | Nhóm | Tham số | Đối tượng mặc định |
|---|---|---|---|---|
| `EFF_DMG_DIRECT` | Sát thương trực tiếp | SAT_THUONG | he_so (decimal, theo ATK) | MOT_DICH |
| `EFF_DMG_DOT` | Sát thương theo thời gian | SAT_THUONG | sat_thuong_moi_luot (int), so_luot (int) | MOT_DICH |
| `EFF_DMG_TRUE` | Sát thương xuyên giáp | SAT_THUONG | he_so (decimal) | MOT_DICH |
| `EFF_DMG_AOE` | Sát thương diện rộng | SAT_THUONG | he_so (decimal) | TAT_CA_DICH |
| `EFF_LIFESTEAL` | Hút máu | SAT_THUONG | phan_tram_hoi (decimal) | BAN_THAN |
| `EFF_STUN` | Choáng | KHONG_CHE | so_luot (int) | MOT_DICH |
| `EFF_SILENCE` | Câm lặng | KHONG_CHE | so_luot (int) | MOT_DICH |
| `EFF_ROOT` | Trói chân | KHONG_CHE | so_luot (int) | MOT_DICH |
| `EFF_SLOW` | Giảm tốc | KHONG_CHE | phan_tram_giam (decimal), so_luot (int) | MOT_DICH |
| `EFF_BUFF_ATK` | Tăng công | BUFF | gia_tri (decimal), so_luot (int) | BAN_THAN |
| `EFF_BUFF_DEF` | Tăng thủ | BUFF | gia_tri (decimal), so_luot (int) | BAN_THAN |
| `EFF_BUFF_SPD` | Tăng tốc | BUFF | gia_tri (decimal), so_luot (int) | BAN_THAN |
| `EFF_SHIELD` | Khiên chắn | BUFF | luong_hap_thu (int) | BAN_THAN |
| `EFF_DEBUFF_ATK` | Giảm công | DEBUFF | gia_tri (decimal), so_luot (int) | MOT_DICH |
| `EFF_DEBUFF_DEF` | Giảm thủ | DEBUFF | gia_tri (decimal), so_luot (int) | MOT_DICH |
| `EFF_HEAL` | Hồi máu | HOI_PHUC | gia_tri (decimal hoặc int cố định) | BAN_THAN |
| `EFF_HOT` | Hồi máu theo thời gian | HOI_PHUC | luong_moi_luot (int), so_luot (int) | BAN_THAN |
| `EFF_CLEANSE` | Thanh lọc (gỡ debuff) | TIEN_ICH | so_luong_go (int) | BAN_THAN |
| `EFF_DISPEL` | Giải trừ (gỡ buff địch) | TIEN_ICH | so_luong_go (int) | MOT_DICH |

**Ràng buộc**: đây là danh sách đóng ở v1. Dev Mode (Phần 3) chỉ được phép **dùng lại** các mã này để cấu hình skill, không được tạo mã hiệu ứng mới nằm ngoài danh sách này. Thêm loại hiệu ứng hoàn toàn mới là thay đổi tầng engine, ngoài phạm vi Dev Mode.

---

## 0.8.1 Quy tắc thi hành 19 hiệu ứng (bổ sung v1.5 — bắt buộc đọc trước khi code engine)

> Mục này định nghĩa **chính xác** cách mỗi hiệu ứng thực thi. Trước v1.5, file chỉ có schema tham số (`tham_so_schema`) chứ chưa có công thức/ngữ nghĩa — hai người đọc cùng spec có thể build ra hai kết quả khác nhau mà không ai sai theo văn bản cũ. Mục này đóng khoảng trống đó.
>
> **⚠️ CẦN DUYỆT**: các mục đánh dấu ⚠️ là quyết định thiết kế game (game design decision), không phải chi tiết kỹ thuật trung tính. Đã chọn sẵn giá trị mặc định hợp lý, dễ implement, để không chặn tiến độ — nhưng đây là lựa chọn của Claude thay bạn tạm thời, cần bạn xác nhận hoặc yêu cầu đổi trước khi build, đừng để lọt qua.

> **Quy ước v1.8.0 (đọc trước):** (1) mọi chỗ ghi "chỉ số nền (từ snapshot)", `spd_nen`, `hp_toi_da`, `mp_toi_da`, `mp_hoi_moi_luot` trong mục 0.8.1 và 1.5 được hiểu là **chỉ số cuối** = nền Class + Stat Allocation (mục 0.8.4); (2) "phe đối lập" = actor thuộc **đội khác** (`doi`), "đồng đội" = actor cùng `doi` (kể cả bản thân khi `doi_tuong` cho phép); (3) mọi mục có nhắc "1v1/hai actor" được đọc là "mỗi đội 1–3 actor" — logic không đổi, chỉ tập mục tiêu rộng hơn.

### A. Công thức sát thương nền (áp dụng cho mọi effect nhóm SAT_THUONG trừ khi ghi chú khác)

```text
sat_thuong_thuc_te = ROUND( ATK_hien_tai × he_so × 100 / (100 + DEF_hien_tai) )
sat_thuong_thuc_te = MAX(sat_thuong_thuc_te, 1)   // tối thiểu 1 sát thương, tránh damage = 0 khi DEF quá cao
```
- `ATK_hien_tai`/`DEF_hien_tai` = chỉ số nền (từ snapshot) đã cộng buff/debuff đang có hiệu lực tại thời điểm tính (`EFF_BUFF_ATK`, `EFF_DEBUFF_ATK`, `EFF_BUFF_DEF`, `EFF_DEBUFF_DEF`).
- Công thức `100/(100+DEF)` là dạng "giảm sát thương theo tỉ lệ" tiêu chuẩn, tránh DEF cao tuyệt đối gây miễn nhiễm hoàn toàn hoặc damage âm. ⚠️ **CẦN DUYỆT** — nếu bạn muốn công thức trừ thẳng (`ATK × he_so − DEF`) hoặc một đường cong khác, đổi tại đây, phần còn lại của mục A không đổi.
- Áp dụng cho: `EFF_DMG_DIRECT`, `EFF_DMG_AOE` (tính riêng từng mục tiêu, không chia sẻ sát thương).

### B. `EFF_DMG_TRUE` (sát thương xuyên giáp)
```text
sat_thuong_thuc_te = ROUND( ATK_hien_tai × he_so )   // KHÔNG áp dụng công thức DEF ở mục A
```
Không có sàn tối thiểu riêng (đã luôn ≥ round(ATK × he_so) vì bỏ qua DEF).

### C. `EFF_DMG_DOT` (sát thương theo thời gian)
```text
sat_thuong_moi_tick = sat_thuong_moi_luot   // giá trị cố định (int) từ tham số, KHÔNG áp dụng công thức DEF ở mục A, KHÔNG đọc lại ATK
```
⚠️ **CẦN DUYỆT** — DOT hiện là sát thương cố định không phụ thuộc ATK/DEF (đơn giản, dễ cân bằng số liệu khi tạo skill ở Dev Mode). Nếu muốn DOT scale theo ATK, cần đổi tham số schema (thêm `he_so`) — không đổi ngầm ở đây.

### D. `EFF_LIFESTEAL` (hút máu)
```text
luong_hoi = ROUND( sat_thuong_thuc_su_mat_cua_muc_tieu × phan_tram_hoi )
```
- `sat_thuong_thuc_su_mat_cua_muc_tieu` = lượng **HP thật sự bị trừ** của mục tiêu sau khi đã trừ qua shield (nếu shield hấp thụ hết, HP không giảm → lifesteal = 0 từ đòn đó). ⚠️ **CẦN DUYỆT** — chọn "sau shield" để tránh lifesteal bị lợi dụng đánh vào shield trống; nếu bạn muốn tính trên sát thương gốc (trước shield), đổi một chữ tại đây.
- `EFF_LIFESTEAL` chỉ có ý nghĩa khi đi kèm ít nhất một effect SAT_THUONG khác trong cùng skill (áp dụng ngay sau effect gây damage đó, theo đúng thứ tự mảng `danh_sach_hieu_ung`); nếu skill không có effect SAT_THUONG nào trước nó trong mảng, `EFF_LIFESTEAL` không hồi gì (không lỗi, chỉ vô tác dụng — validate ở Dev Mode nên cảnh báo nhưng không chặn lưu).
- Không vượt `hp_toi_da` (theo quy tắc 1.5 #9).

### E. `EFF_STUN` (choáng) ⚠️ CẦN DUYỆT
- Actor bị STUN **vẫn tham gia tính gauge ATB bình thường** (không bị loại khỏi ATB như actor chết).
- Khi ATB chọn actor đang bị STUN đi tiếp theo: hệ thống **tự động thực hiện BỎ_LƯỢT thay actor đó** (không hỏi client, không chờ input) — không trừ MP, không đặt cooldown mới, không áp dụng effect nào.
- MP vẫn hồi `mp_hoi_moi_luot` bình thường ở lượt đó (theo quy tắc 1.5 #5 — MP hồi "khi đến lượt", không điều kiện theo có hành động được hay không).
- Cooldown các skill của actor đó **vẫn giảm** ở lượt này (vì cooldown đếm theo "số lần actor được đi", và lượt bị STUN vẫn tính là 1 lần actor được đi — theo đúng quy tắc 1.5 #4).
- Effect vẫn có hiệu lực (ép BỎ_LƯỢT) cho **toàn bộ** lượt mà actor được ATB chọn trong khi `so_luot` còn > 0 tại thời điểm kiểm tra. Chỉ **sau khi** lượt BỎ_LƯỢT tự động đó hoàn tất (cùng bước 12a giảm cooldown, mục 1.5.3), `so_luot` của STUN mới giảm đúng 1; nếu chạm 0 thì effect bị gỡ, có hiệu lực từ lần actor đó được ATB chọn **tiếp theo** trở đi — actor hành động bình thường từ đó. Xem ngữ nghĩa đầy đủ và ví dụ số ở mục 0.8.1.M (nhóm A).

### F. `EFF_SILENCE` (câm lặng) ⚠️ CẦN DUYỆT
- Vì game không có "đánh thường" (basic attack), SILENCE **không thể** cấm tuyệt đối mọi hành động (sẽ trùng hoàn toàn với STUN — vô nghĩa khi có 2 effect giống nhau).
- Định nghĩa v1.5: actor bị SILENCE **không được dùng skill nào có chứa ít nhất 1 effect thuộc nhóm `HOI_PHUC`, `BUFF`, hoặc `TIEN_ICH`** trong `danh_sach_hieu_ung` (tức không hồi máu/buff/cleanse/dispel được) — vẫn được dùng skill thuần sát thương/debuff/khống chế (`SAT_THUONG`, `DEBUFF`, `KHONG_CHE`).
- Nếu actor bị SILENCE mà **mọi skill khả dụng** (còn cooldown = 0, đủ MP) đều thuộc nhóm bị cấm → server tự BỎ_LƯỢT thay actor đó (giống STUN về mặt xử lý, khác về điều kiện kích hoạt).
- Nếu client gửi `ky_nang_id` của skill bị cấm trong lúc đang SILENCE → server từ chối hành động, trả lỗi rõ ràng (không phải BỎ_LƯỢT ngầm — client phải biết để chọn skill khác).

### G. `EFF_ROOT` (trói chân) ⚠️ CẦN DUYỆT
Game không có movement/hitbox nên "trói chân" theo nghĩa đen không áp dụng được. Định nghĩa lại cho turn-based v1: actor bị ROOT **chỉ được dùng skill có TOÀN BỘ effect trong `danh_sach_hieu_ung` nhắm `BAN_THAN`** (không thể nhắm địch hay đồng đội) — mô phỏng "không di chuyển được để tiếp cận/hỗ trợ ai khác", hoặc BỎ_LƯỢT. Nếu actor không có skill nào toàn bộ effect là `BAN_THAN` (và đủ điều kiện dùng) → chỉ còn lựa chọn BỎ_LƯỢT, client không cần server tự ép (vẫn để client chọn BỎ_LƯỢT tường minh, khác với STUN/SILENCE).

### H. `EFF_SLOW` / `EFF_BUFF_SPD`
Cộng/trừ trực tiếp vào `spd_hien_tai` (mục 1.5.0). Đặt `spd_goc` = chỉ số cuối SPD (0.8.4). `EFF_SLOW`: `spd_sau_slow = ROUND(spd_goc × (1 − phan_tram_giam))`. `EFF_BUFF_SPD`: cộng thẳng `gia_tri` (không phải %). Nếu cả hai cùng hiệu lực: áp dụng % giảm trước trên `spd_goc`, rồi cộng `gia_tri` buff. **v1.8.0 — clamp cuối (thay cho "clamp tối thiểu 1" của v1.7.0):** `spd_hien_tai` phải nằm trong `[MAX(1, ROUND(0.5 × spd_goc)), ROUND(1.5 × spd_goc)]`. Nghĩa là SLOW không thể khoá gần như hoàn toàn một actor và BUFF_SPD không thể nhân tốc độ vô hạn; vẫn giữ bảo đảm SPD ≥ 1. Đây là một lớp của chuỗi chống SPD snowball (mục 0.13.3).

### I. `EFF_SHIELD` (khiên chắn) ⚠️ CẦN DUYỆT
Cast thêm `EFF_SHIELD` khi đã có shield: **cộng dồn** (`shield_hien_tai += luong_hap_thu` mới), không replace, không lấy max, không có trần tối đa ở v1. Shield hấp thụ sát thương theo thứ tự: shield trừ trước, phần dư (nếu sát thương lớn hơn shield còn lại) mới trừ vào HP. Shield không tự hết hạn theo lượt (không có `so_luot` trong tham số của effect này) — chỉ giảm khi hấp thụ sát thương, tồn tại đến khi bị tiêu hao hết hoặc trận kết thúc. **v1.8.0 — trần khiên:** `shield_hien_tai` không được vượt `ROUND(0.5 × hp_toi_da)` của actor mang; phần vượt bị cắt và ghi log `bi_cat_tran`. Lý do: ở 3v3 shield/heal lên đồng đội là công cụ chống focus fire, nhưng nếu cộng dồn không trần thì nhiều người cùng che một actor tạo ra trạng thái gần bất tử (hard counter theo chiều ngược lại).

### J. `EFF_CLEANSE` / `EFF_DISPEL` (thanh lọc / giải trừ) ⚠️ CẦN DUYỆT
Khi `so_luong_go` nhỏ hơn số debuff (CLEANSE) hoặc buff (DISPEL) đang có: **gỡ theo thứ tự cũ nhất bị áp dụng trước (FIFO)** — effect nào được thêm vào mảng `debuff`/`buff` của actor sớm nhất bị gỡ trước. **v1.8.0 — thứ tự hai tầng:** `EFF_CLEANSE` gỡ debuff nhóm `KHONG_CHE` (STUN/SILENCE/ROOT/SLOW) **trước**, hết mới tới `EFF_DEBUFF_ATK/DEF`; trong mỗi tầng vẫn FIFO. Lý do: ở 3v3 cleanse là công cụ counterplay chính chống CC; FIFO thuần khiến cleanse có thể gỡ nhầm debuff ít nguy hiểm trong khi đồng đội vẫn bị choáng. Các effect `KHONG_CHE` được lưu trong mảng `debuff` (mỗi phần tử có trường `nhom`) — làm rõ chỗ v1.7.0 chưa nói. `EFF_DISPEL` giữ FIFO thuần. Khi CC bị gỡ, xem Kháng CC ở mục 0.8.5. `EFF_CLEANSE` chỉ gỡ trong mảng `debuff` của actor (không đụng `dot`); `EFF_DISPEL` chỉ gỡ trong mảng `buff` của mục tiêu (không đụng `hot`). DOT/HOT **không bị CLEANSE/DISPEL gỡ** ở v1 (coi là nhóm riêng, không phải buff/debuff thường) — ⚠️ nếu muốn CLEANSE gỡ luôn DOT, cần nói rõ vì đây là quyết định cân bằng game.

### K. Buff/debuff cùng mã (`EFF_BUFF_ATK` cast 2 lần, v.v.) ⚠️ CẦN DUYỆT
Cast lại effect cùng mã trong khi effect cũ chưa hết: **refresh (làm mới) thời lượng về `so_luot` mới nhất**, KHÔNG cộng dồn giá trị (`gia_tri` không đổi, không nhân đôi). Đây là lựa chọn đơn giản nhất để tránh buff/debuff bị stack vô hạn gây mất cân bằng khó kiểm soát qua Dev Mode. Áp dụng tương tự cho `EFF_DOT`/`EFF_HOT` cùng mã: cast lại thì **refresh** (thay hoàn toàn `so_luot` và `sat_thuong_moi_luot`/`luong_moi_luot` bằng giá trị mới), không tồn tại 2 instance DOT/HOT cùng mã chạy song song trên cùng actor. **Ngoại lệ v1.8.0:** `EFF_STUN`/`EFF_SILENCE`/`EFF_ROOT` **không refresh** — actor đang mang một CC khoá thì mọi cast CC khoá lên nó đều không có tác dụng (mục 0.8.5), để CC không thể gia hạn vô hạn.

### L. Tương tác với cái chết (death) giữa chuỗi effect
Một skill có nhiều effect áp dụng theo thứ tự mảng (mục 1.5.2 bước 7b). Nếu một effect làm actor mục tiêu chết (`hp_hien_tai` chạm 0) **giữa chừng** chuỗi effect của cùng 1 lượt: các effect tiếp theo trong mảng **vẫn tiếp tục áp dụng cho các mục tiêu khác** (nếu có, ví dụ AOE), nhưng **bỏ qua** mọi effect còn lại nhắm vào chính actor đã chết đó (không hồi máu/buff/debuff thêm cho actor đã chết). Actor chết bị loại khỏi ATB ngay (theo mục 1.5.0), nhưng việc kiểm tra thắng/thua toàn trận vẫn đợi đến hết bước 11 của `thuc_hien_luot_danh` (sau khi toàn bộ effect + DOT/HOT của lượt đã xử lý xong), tránh kết thúc trận giữa chừng một chuỗi effect chưa áp dụng hết.

**DOT/HOT và actor chết trong cùng lượt (chốt rõ, đóng blocker #4 của audit v1.5):** Bước 9 của `thuc_hien_luot_danh` ("Xử lý DOT/HOT đến hạn cho mọi actor còn sống") chỉ xử lý tick cho actor có `hp_hien_tai > 0` **tại thời điểm bước 9 bắt đầu** — tức SAU khi toàn bộ effect trực tiếp của bước 7 đã áp dụng. Nếu actor B bị effect trong bước 7 làm chết (`hp_hien_tai ≤ 0`) thì:
- DOT còn lại trên B **không tick** ở lượt này (B không nhận thêm damage từ DOT sau khi đã chết).
- HOT còn lại trên B **không tick** ở lượt này (không hồi máu actor đã chết).
- Cả hai effect (DOT và HOT) trên B coi như bị loại bỏ cùng lúc B bị loại khỏi ATB, không cần đợi tick lần cuối để "dùng hết" `so_luot` còn lại.

**Nhiều actor chết trong cùng một action (mới v1.8.0):** một action (AOE, hoặc effect + passive) có thể khiến 2–3 actor chết. Quy tắc:
1. Actor có `hp_hien_tai ≤ 0` **chết ngay về mặt hiệu lực**: không nhận thêm effect, bị bỏ qua khi kiểm tra passive, không thể được ATB chọn.
2. Việc **ghi** cái chết (`actor_chet[]`, sắp theo `thu_tu_uu_tien` tăng dần), loại actor khỏi tập ứng viên ATB và vô hiệu buff/debuff/DOT/HOT trên actor đó diễn ra **nguyên tử trong cùng transaction** của action; không có trạng thái commit nào chứa actor `hp ≤ 0` vẫn là ứng viên ATB.
3. Kiểm tra thắng/thua (mục 1.5.5) chỉ chạy **sau khi** toàn bộ effect (7b), passive (7c) và DOT/HOT (9) đã xử lý xong.

### M. Ngữ nghĩa `so_luot` (duration) — áp dụng thống nhất cho mọi effect có duration (chốt rõ, đóng blocker #2 của audit v1.5)

`so_luot` xuất hiện ở nhiều effect (`EFF_STUN`, `EFF_SILENCE`, `EFF_ROOT`, `EFF_SLOW`, `EFF_BUFF_ATK/DEF/SPD`, `EFF_DEBUFF_ATK/DEF`, `EFF_DMG_DOT`, `EFF_HOT`) nhưng đếm theo **hai nhịp khác nhau** tuỳ nhóm — đây là điểm dễ hiểu sai nhất nếu không tách rõ:

**Nhóm A — đếm theo lượt của chính actor MANG effect** (`EFF_STUN`, `EFF_SILENCE`, `EFF_ROOT`, `EFF_SLOW`, `EFF_BUFF_ATK`, `EFF_BUFF_DEF`, `EFF_BUFF_SPD`, `EFF_DEBUFF_ATK`, `EFF_DEBUFF_DEF`): mỗi khi actor mang effect này **được ATB chọn đi tiếp theo**, effect có hiệu lực **trong suốt** lượt đó — hiệu lực được kiểm tra/áp dụng cho hành động của lượt đó **trước** (dù lượt đó actor dùng skill, BỎ_LƯỢT chủ động, hay bị ép BỎ_LƯỢT do chính effect này); chỉ **sau khi** lượt đó đã hoàn tất mới giảm `so_luot` đúng 1 — đúng thời điểm với bước giảm cooldown ở bước 12a của `thuc_hien_luot_danh` (mục 1.5.3). Nếu sau khi giảm, `so_luot` chạm 0 thì effect bị gỡ; việc gỡ có hiệu lực **từ lần actor đó được ATB chọn tiếp theo trở đi**, không hồi tố lượt vừa hoàn tất. Effect vừa được cast có hiệu lực ngay lập tức (ví dụ STUN cast ở lượt A1 khiến actor bị stun ngay khi rời lượt A1) nhưng lần giảm `so_luot` đầu tiên chỉ tính vào cuối lần actor đó **tiếp theo** được ATB chọn, không giảm ngay lúc cast. Nếu actor mang effect không được ATB chọn trong một khoảng thời gian (vì actor khác nhanh hơn đi liên tiếp), `so_luot` **không giảm** — effect "đóng băng" cho tới đúng lượt của actor đó. (Đây là cách hiểu DUY NHẤT kể từ v1.6.1 — đóng mâu thuẫn giữa ví dụ số ở bản v1.6 trước đó và acceptance test ở mục 0.12: bản v1.6 từng mô tả nhầm việc giảm `so_luot` xảy ra **trước** hành động của lượt đó, khiến STUN `so_luot=1` không có tác dụng gì trên thực tế — sai với chính acceptance test yêu cầu STUN=1 phải ép đúng 1 lần BỎ_LƯỢT.)

  **Ví dụ số cụ thể (STUN, `so_luot = 2`):** Actor A dùng STUN lên B ở lượt A1.
  - B bị stun ngay từ thời điểm này — nếu B là actor tiếp theo được ATB chọn, B tự động BỎ_LƯỢT.
  - Lần B được ATB chọn đi tiếp theo (gọi là B-lần-1): B bị ép BỎ_LƯỢT (effect vẫn còn hiệu lực với `so_luot=2` tại thời điểm kiểm tra hành động). Sau khi lượt B-lần-1 hoàn tất, giảm `so_luot` đi 1 → còn 1, effect vẫn tồn tại cho lượt kế.
  - Lần B được ATB chọn đi kế tiếp nữa (B-lần-2): B lại bị ép BỎ_LƯỢT (effect vẫn còn hiệu lực với `so_luot=1` tại thời điểm kiểm tra hành động của lượt này). Sau khi lượt B-lần-2 hoàn tất, giảm `so_luot` đi 1 → chạm 0, effect bị gỡ.
  - Lần B được ATB chọn đi kế tiếp nữa (B-lần-3): effect đã bị gỡ từ cuối B-lần-2 → B hành động **bình thường**.
  - Tổng cộng: đúng 2 lần BỎ_LƯỢT (B-lần-1, B-lần-2), hành động bình thường bắt đầu từ B-lần-3 — khớp với acceptance test ở mục 0.12.
  - Nếu giữa lượt A1 và B-lần-1 có nhiều actor khác chen vào (do SPD khác nhau), điều đó không ảnh hưởng — `so_luot` chỉ đếm theo lượt của B, không đếm theo lượt toàn trận.

**Nhóm B — đếm theo lượt toàn trận** (`EFF_DMG_DOT`, `EFF_HOT`): theo quy tắc 1.5 #6 — tick một lần ở cuối MỖI lượt bất kỳ actor nào hành động trong toàn trận (không phải riêng lượt của actor mang effect), rồi giảm `so_luot` 1. Effect mới tạo ở lượt hiện tại không tick ngay trong lượt tạo ra nó — tick đầu tiên xảy ra ở cuối lượt kế tiếp (của bất kỳ actor nào) tính từ lúc effect được tạo.

Không có effect nào khác cách hiểu `so_luot` ngoài hai nhóm trên; nếu Dev Mode sau này thêm effect mới ngoài 19 effect hiện tại, phải xếp effect đó vào đúng 1 trong 2 nhóm này, không được tạo nhịp đếm thứ ba.

---

## 0.8.2 Hệ thống Nội tại Class — ngữ nghĩa thực thi v1.7.0 (bổ sung audit 3v3 ở v1.8.0)


Nội tại Class là **cơ chế tự động**, không phải skill trong `ky_nang_trang_bi`. Mỗi Class hoạt động có đúng 1 nội tại. Nội tại được cấu hình bằng 1–2 effect đã có trong registry 19 effect; không được tạo loại effect mới.

**Trigger được hỗ trợ ở v1.7.0:**
- `BAT_DAU_TRAN`: kiểm tra một lần ngay sau khi actor được dựng từ snapshot và trước lượt đầu tiên.
- `BAT_DAU_LUOT`: kiểm tra ở đầu mỗi lượt của chính actor sở hữu passive, sau hồi MP và trước input skill.
- `KHI_SU_DUNG_SKILL`: kiểm tra sau khi skill của chính actor được thi triển thành công.
- `KHI_GAY_SAT_THUONG`: kiểm tra sau khi actor gây sát thương thực tế > 0.
- `KHI_NHAN_SAT_THUONG`: kiểm tra sau khi actor nhận sát thương HP thực tế > 0.

**Điều kiện:** `dieu_kien = {}` nghĩa là luôn thỏa khi trigger xảy ra. v1.7.0 tối thiểu hỗ trợ điều kiện `HP_PCT_NHO_HON_BANG` và `HP_PCT_LON_HON_BANG`, tính trên `hp_hien_tai / hp_toi_da × 100` tại thời điểm kiểm tra. Nếu điều kiện không thỏa, không effect nào của passive được áp dụng.

**Tần suất trigger:** `KHI_SU_DUNG_SKILL` chỉ kích hoạt tối đa 1 lần cho mỗi lần skill thi triển thành công; `KHI_GAY_SAT_THUONG` tối đa 1 lần cho mỗi action nếu actor gây ít nhất 1 HP damage thực tế (không nhân theo số target/effect); `KHI_NHAN_SAT_THUONG` tối đa 1 lần cho mỗi action nếu actor mất ít nhất 1 HP thực tế.

**Giới hạn chống vòng lặp (v1.7.0; được siết thành chain depth = 1 ở v1.8.0 — xem đoạn bổ sung cuối mục):** effect do Nội tại Class sinh ra **không tự kích hoạt lại chính passive đó trong cùng một event chain**. Engine đánh dấu nguồn thực thi `NOI_TAI`; passive không được chain đệ quy vô hạn. Một event combat mới do hành động tiếp theo vẫn có thể kích hoạt passive theo trigger bình thường.

**Thứ tự passive `BAT_DAU_TRAN`:** sau khi dựng toàn bộ `actors[]`, engine xử lý passive của các actor theo `thu_tu_uu_tien` tăng dần. Sau khi toàn bộ passive đầu trận hoàn tất mới xác định actor đầu tiên bằng ATB. Như vậy kết quả khởi tạo deterministic và passive không phụ thuộc thứ tự client kết nối.

**Thứ tự:** nếu một passive có 2 effect, áp dụng theo đúng thứ tự trong `danh_sach_hieu_ung`, giống skill. Nếu effect thứ nhất làm thay đổi điều kiện của effect thứ hai, effect thứ hai đọc trạng thái sau effect thứ nhất.

**Tương tác với chết:** nếu actor đã chết trước thời điểm passive được kiểm tra thì bỏ qua passive; không có passive hậu tử v1.7.0. Effect nhắm actor đã chết bị xử lý theo quy tắc chung của engine và được log là `bi_bo_qua` nếu không áp dụng.

**Snapshot:** passive được snapshot cùng Class. Sửa passive trong Dev Mode không thay đổi trận đang diễn ra.

**Bổ sung v1.8.0 — audit passive trong 3v3:**
- **Vị trí trong flow (sửa dead enum):** `BAT_DAU_TRAN` chạy ở `bat_dau_tran` (mục 1.5.2 bước 3); `BAT_DAU_LUOT` ở bước 4.25; ba trigger còn lại (`KHI_SU_DUNG_SKILL`, `KHI_GAY_SAT_THUONG`, `KHI_NHAN_SAT_THUONG`) chạy ở **bước 7c mới** của `thuc_hien_luot_danh` (mục 1.5.3). Ở v1.7.0 ba trigger này được định nghĩa nhưng không có bước thực thi trong flow.
- **Thứ tự tại bước 7c** (sau khi toàn bộ effect skill ở 7b đã áp dụng; trong mỗi nhóm theo `thu_tu_uu_tien` tăng dần): (1) `KHI_SU_DUNG_SKILL` của actor thi triển; (2) `KHI_GAY_SAT_THUONG` của actor thi triển; (3) `KHI_NHAN_SAT_THUONG` của từng actor mất ≥ 1 HP thực tế trong action. Actor có `hp ≤ 0` tại thời điểm kiểm tra bị bỏ qua.
- **AOE/multi-target:** `KHI_GAY_SAT_THUONG` của người gây tối đa 1 lần/action dù đánh 3 mục tiêu. `KHI_NHAN_SAT_THUONG` tính riêng cho từng actor mất HP (tối đa 1 lần/actor/action); 3 mục tiêu có thể kích hoạt 3 passive khác nhau — đúng thiết kế, vì mỗi actor là một chủ sở hữu passive độc lập.
- **Chain depth = 1 (thay cho rule "không tự kích hoạt lại chính passive đó"):** effect có `nguon = NOI_TAI` **không kích hoạt bất kỳ trigger passive nào của bất kỳ actor nào**. Rule cũ chỉ chặn passive tự gọi lại chính nó, chưa chặn ping-pong giữa passive của hai actor đối lập.
- **DOT/HOT (`nguon = DOT_HOT`) không kích hoạt** `KHI_GAY_SAT_THUONG`/`KHI_NHAN_SAT_THUONG` (tránh tới 6 actor kích hoạt passive sau mỗi action). Đây là làm rõ một khoảng trống của v1.7.0 (chưa nói DOT có tính là "sát thương của action" hay không).
- **Effect passive gây chết actor:** xử lý như mọi cái chết khác (mục 0.8.1.L) trước khi kiểm tra thắng/thua.
- **`BAT_DAU_TRAN` với nhiều actor:** xử lý theo `thu_tu_uu_tien` tăng dần cho **đúng số actor thực tế tham gia trận** (tối đa 6, tối thiểu 2, tùy quân số 1–3/đội đã chọn), đúng 1 lần/actor; reload/reconnect không chạy lại vì đã nằm trong trạng thái đã commit.

**Ví dụ:**
- Hộ Vệ — `BAT_DAU_TRAN` → `EFF_SHIELD` 200.
- Cuồng Chiến — `KHI_GAY_SAT_THUONG` + điều kiện HP ≤ 50% → `EFF_BUFF_ATK` +20 trong 1 lượt.
- Thuật Sư — `BAT_DAU_LUOT` → `EFF_BUFF_SPD` +10 trong 1 lượt.

## 0.8.3 Ngữ nghĩa `thoi_diem` của Skill (chốt rõ, đóng blocker #3 của audit v1.5) ⚠️ CẦN DUYỆT

Enum `thoi_diem` có 3 giá trị (`KHI_THI_TRIEN`, `KHI_DANH_TRUNG`, `BI_DONG_DAU_TRAN`) nhưng trước v1.6, flow combat (`thuc_hien_luot_danh`, mục 1.5.3 bước 7b) không hề phân nhánh xử lý theo giá trị này — nghĩa là 2 trong 3 giá trị không có ngữ nghĩa thực thi nào được định nghĩa, dù Dev Mode (mục 3.4) vẫn cho phép chọn chúng khi tạo skill. Đây là một trường hợp field tồn tại trong schema nhưng "chết" trong engine — rất dễ khiến dev tự chế ra hành vi khi implement. Chốt như sau cho v1:

- **`KHI_THI_TRIEN`** — giá trị duy nhất có ngữ nghĩa thực thi trong Skill ở v1.7.0: effect áp dụng như một phần của chuỗi xử lý khi skill được dùng thành công. Đây là giá trị mặc định và **là giá trị duy nhất được phép chọn khi tạo Skill ở Dev Mode**.
- **`KHI_DANH_TRUNG`** — v1.7.0 không có hệ thống hit/miss/evasion, nên không có "trúng" để phân biệt với "thi triển". Dev Mode **reject** khi lưu Skill nếu chọn giá trị này; dành cho version sau khi engine có hit/miss.
- **`BI_DONG_DAU_TRAN`** — **không được dùng trong Skill**. Giá trị này chỉ có ngữ nghĩa khi cấu hình **Nội tại Class** theo mục 0.8.2 với trigger `BAT_DAU_TRAN`. Skill Creator phải reject nếu skill chọn `BI_DONG_DAU_TRAN`.

**Kết luận v1.7.0:** Skill chỉ chấp nhận `KHI_THI_TRIEN`. `KHI_DANH_TRUNG` vẫn dành cho version có hit/miss và bị reject. `BI_DONG_DAU_TRAN` được engine hỗ trợ **chỉ trong Nội tại Class**, không phải skill.

---

## 0.8.4 Stat Allocation & chỉ số cuối (mới v1.8.0, cộng hệ số Tier ở v2.1.0)

### A. Luật phân bổ
- Sau khi chọn Class, mỗi nhân vật có **đúng 5 điểm** phân bổ vào 6 stat: HP, ATK, DEF, SPD, MP, MP Regen (cột `diem_hp`, `diem_atk`, `diem_def`, `diem_spd`, `diem_mp`, `diem_mp_hoi`, giữ naming tiếng Việt không dấu hiện có).
- **Invariant:** `SUM(diem_*) = 5` và `0 ≤ diem_x ≤ 2` cho mọi stat; số nguyên, không âm, không vượt tổng. Hệ quả: mọi build hợp lệ dùng ít nhất 3 stat khác nhau (2+2+1, 2+1+1+1, 1+1+1+1+1).
- Hợp lệ: `HP 2, ATK 1, SPD 2`. Không hợp lệ: `SPD 5`; `ATK 3, SPD 2` (vượt 2/stat); `HP 2, ATK 2` (tổng 4).
- Server validate và tính kết quả; client không được quyết định chỉ số cuối (nguyên tắc 0.3 #6). Điểm không tự tăng theo thời gian/EXP — v1.8.0 không có tiến trình.

### B. Công thức quy đổi — hàm server `tinh_chi_so_cuoi`

**Bước 0 — áp hệ số Tier (mới ở v2.1.0, chỉ HP/ATK/DEF):** `chi_so_nen_hieu_dung = ROUND(chi_so_nen × he_so_tier[tier])` cho HP/ATK/DEF, lấy `he_so_tier` từ `cau_hinh_he_thong` (mục 0.7.13b, ladder đủ 6 bậc `C/B/A/S/SS/SSS` — ADR-09); SPD/MP/MP Regen giữ nguyên `chi_so_nen_hieu_dung = chi_so_nen`. Phòng `che_do_tier = CAN_BANG` hoặc PvE: `he_so_tier = 1.00` cho mọi actor bất kể `tier` thật — chỉ vô hiệu bước này (Layer 1), không ảnh hưởng Nội tại/skill (Layer 2, mục G).

**Tier Ladder (giá trị khởi điểm, làm mượt lại ở v2.3.0 sau balance audit — ⚠️ PLAYTEST-VERIFIABLE — BALANCE SEED, mục 0.8.6.I):**

| Tier | Hệ số | Ý nghĩa | Nguồn |
|---|---|---|---|
| `C` | 0.94 | Baseline thấp | Chỉ AI (độ khó dễ) |
| `B` | 1.00 | Phổ biến | Mặc định roll nhân vật người chơi (60%) |
| `A` | 1.04 | Khá | Roll nhân vật người chơi (30%) |
| `S` | 1.08 | Giỏi | Roll nhân vật người chơi (10%) |
| `SS` | 1.13 | Xuất sắc | Chỉ AI (độ khó cao) |
| `SSS` | 1.22 | Thần — Linh Thần | Chỉ Bách Thần Điện, không roll |

Bước nhảy `C→B` +6, `B→A` +4, `A→S` +4, `S→SS` +5, `SS→SSS` +9 điểm % — đường cong mượt hơn bản v2.2.0 (trước: +8/+5/+5/+6/+14), `SS→SSS` vẫn là bước nhảy lớn nhất ladder (gần gấp đôi bước nhảy kế trước) nên SSS vẫn rõ ràng là tier cao nhất, nhưng không còn là một cú nhảy đột biến (đóng góp ý balance audit, ADR-09). Đây là Layer 1; Layer 2 (kit, mục G) nay là điều kiện bắt buộc, không chỉ là gợi ý.

Với mỗi stat: `bonus_moi_diem = MAX(1, ROUND(chi_so_nen_hieu_dung × ty_le))` và `chi_so_cuoi = chi_so_nen_hieu_dung + diem × bonus_moi_diem`. Quy đổi theo **% chỉ số nền hiệu dụng** (không dùng số cố định, vì spec không quy định thang chỉ số Class và số cố định sẽ lợi Class này thiệt Class khác) — Stat Allocation luôn cộng thêm đúng % như nhau bất kể Tier, nhờ vậy Tier chỉ dịch mặt bằng, không đổi ý nghĩa của 5 điểm.

| Stat | `co_so` | `ty_le` | Giá trị chiến đấu quy đổi (mỗi điểm) |
|---|---|---|---|
| HP | `hp_nen` | 6% | ≈ +6% máu hiệu dụng |
| ATK | `atk_nen` | 6% | ≈ +6% sát thương gây ra |
| DEF | `100 + def_nen` | 6% | ≈ +6% máu hiệu dụng (neo theo công thức `100/(100+DEF)` ở 0.8.1.A: tăng DEF thêm 6% của `100+DEF` làm sát thương nhận vào giảm đúng hệ số 1/1.06) |
| SPD | `spd_nen` | 3% | ≈ +3% tần suất lượt |
| MP | `mp_nen` | 10% | +10% MP tối đa |
| MP Regen | `mp_hoi_moi_luot` nền | 15% | +15% MP hồi/lượt (tối thiểu +1) |

**Vì sao SPD chỉ 3%:** SPD nhân lên *mọi* thứ (nhiều lượt hơn = nhiều sát thương, CC, heal hơn) và quyết định thứ tự — +1 điểm SPD có giá trị lớn hơn +1 điểm DEF nếu quy đổi cùng tỉ lệ. Giữ HP/ATK/DEF cùng ≈ 6% giá trị chiến đấu để không stat nào áp đảo. ⚠️ **CẦN DUYỆT** — hệ số khởi điểm, phải hiệu chỉnh bằng playtest/Sandbox (mục 0.13, 0.14).

**Ví dụ số (minh họa, tier B / hệ số 1.00):** Class `hp_nen 700, atk_nen 80, def_nen 40, spd_nen 100, mp_nen 60, mp_hoi 8` → `bonus_moi_diem`: HP 42, ATK 5, DEF 8, SPD 3, MP 6, MP Regen 1. Phân bổ `HP 2, ATK 1, SPD 2` → HP 700→784, ATK 80→85, DEF 40, SPD 100→106, MP 60, MP Regen 8.

**Ví dụ số tier S (hệ số 1.08, phòng `TU_DO`), cùng Class, cùng phân bổ:** `chi_so_nen_hieu_dung`: HP 756, ATK 86, DEF 43. `bonus_moi_diem` (tính lại từ số hiệu dụng): HP 45, ATK 5, DEF 9. Kết quả: HP 756→846, ATK 86→91, DEF 43, SPD 100→106 (không đổi vì SPD không nhân tier), MP 60, MP Regen 8. Chênh lệch so với tier B ở ví dụ trên: khoảng **+8% HP/ATK/DEF nền** (trước Stat Allocation).

**Ví dụ số tier SSS (hệ số 1.22, Linh Thần), cùng Class nền, cùng phân bổ — minh hoạ Layer 1:** `chi_so_nen_hieu_dung`: HP 854, ATK 98, DEF 49. `bonus_moi_diem`: HP 51, ATK 6, DEF 9. Kết quả: HP 854→956, ATK 98→104, DEF 49, SPD/MP không đổi bởi tier. So với tier B: **+22% HP/ATK/DEF nền trước Stat Allocation** (cộng dồn kiểu nhân với Stat Allocation tối đa cho ra ≈+36,6% tổng, mục ADR-09) — rõ rệt hơn tier S (+8%) nhưng không còn là cú nhảy đột biến như hệ số 1.30 cũ. Cộng thêm Layer 2 (kit bắt buộc, mục G), khoảng cách thực tế còn lớn hơn con số thuần stat này.

### C. Đối chiếu thuật ngữ (để không sửa từng công thức cũ)
`he_so_tier` = 1.00 khi phòng `CAN_BANG` hoặc PvE, bất kể `tier` lưu trong `nhan_vat`/`doi_ai`; `hp_toi_da` = `chi_so_cuoi.hp`; `mp_toi_da` = `chi_so_cuoi.mp`; `mp_hoi_moi_luot` (quy tắc hồi MP, 1.5 #5) = `chi_so_cuoi.mp_hoi`; `spd_nen`/`spd_goc` (0.8.1.H, 1.5.0) = `chi_so_cuoi.spd`; `ATK`/`DEF` "nền" ở 0.8.1.A = `chi_so_cuoi.atk/def` trước khi cộng buff/debuff.

### D. Snapshot
Tại `bat_dau_tran`, server tính `chi_so_cuoi` cho từng actor và chụp `{chi_so_nen, tier, he_so_tier_ap_dung, phan_bo_diem, he_so_quy_doi, chi_so_cuoi}` vào `du_lieu_noi_dung_snapshot`. `he_so_quy_doi` được chụp cùng để đổi hệ số ở phiên bản sau không ảnh hưởng trận đang chạy hay log cũ. Trong trận **không** đọc `nhan_vat.diem_*` và không tính lại; Dev Mode không sửa được chỉ số actor giữa trận.

### E. Respec
Điểm Stat Allocation **luôn** phân bổ lại miễn phí, không giới hạn số lần (khác Tier — không đổi, mục 0.7.10); người chơi được chỉ ngoài trận (Kho nhân vật, RPC `cap_nhat_phan_bo`, server validate như lúc tạo). Trận đang chạy không bị ảnh hưởng (dùng snapshot); trận mới đọc phân bổ tại thời điểm `bat_dau_tran`.

### F. Kiểm tra tương quan giá trị điểm (Dev Mode)
Class Editor hiển thị bảng "% thực tế mỗi điểm" = `bonus_moi_diem / co_so` cho 6 stat của Class đang chỉnh, đánh dấu ⚠️ (cảnh báo, không chặn) khi lệch quá ±50% so với `ty_le` chuẩn do làm tròn (thường vì chỉ số nền quá nhỏ). Tiêu chí "không có +1 điểm nào vượt xa +1 điểm khác" được kiểm bằng Sandbox AI-vs-AI (mục 3.8).

### G. Layer 2 của Linh Thần (SSS) — acceptance contract bắt buộc, không chỉ là lời khuyên (sửa lại ở v2.3.0)

Hệ số tier ở mục B (Layer 1) chỉ là **một nửa** lý do SSS khác biệt. Ở v2.2.0, nửa còn lại (Layer 2) chỉ là khuyến nghị mềm — balance audit v2.3.0 chỉ ra điều này cho phép một Linh Thần "mạnh nhờ số" mà không thực sự khác biệt lối chơi. Chốt lại thành **điều kiện PASS/FAIL kiểm tra được**:

**Điều kiện bắt buộc (hard block khi lưu, không phải cảnh báo mềm):**
1. Mỗi Class `LINH_THAN` phải có **ít nhất 1** phần tử trong `ky_nang` (thuộc Class đó, `HOAT_DONG`) **hoặc** đúng `noi_tai_class` của Class đó có `dac_trung_rieng = true` (mục 0.7.4/0.7.6).
2. Dev Mode (mục 3.4/3.5) **từ chối lưu/publish** một Class `LINH_THAN` nếu không có bất kỳ `dac_trung_rieng = true` nào — đây là CHECK tại tầng ứng dụng khi publish, không phải validate ở combat engine.
3. Đặc điểm được gắn cờ phải **tạo khác biệt gameplay nhận biết được** — ví dụ: tổ hợp effect lạ trong 1 skill mà Class `THUONG` không có, hoặc tham số vượt khỏi dải thường dùng của Class `THUONG` cùng vai trò. Chỉ đổi tên hiển thị hoặc đổi số trong biên độ thông thường **không được tính là đạt điều kiện này** — nhưng việc đánh giá "có nhận biết được không" là thẩm định nội dung của người thiết kế lúc publish (checklist thủ công), không phải điều kiện tự động hoá được 100%; điều **tự động hoá được** là sự tồn tại của cờ `dac_trung_rieng = true` (điều kiện 1-2).
4. `CAN_BANG` (ADR-08) chỉ đặt `he_so_tier = 1.00`; cờ `dac_trung_rieng` và toàn bộ Nội tại/skill liên quan **luôn hoạt động bình thường** ở mọi phòng — Layer 2 không bị `CAN_BANG` tắt.

**Hướng dẫn cân bằng (vẫn chỉ là gợi ý, không phải CHECK — giữ nguyên từ v2.2.0):** khi soạn skill/Nội tại cho Class `LINH_THAN`, khuyến nghị đặt `he_so`/`sat_thuong_moi_luot`/`so_luot`/`phan_tram_hoi`... cao hơn khoảng 20-30% so với mức thường dùng cho Class `THUONG` cùng vai trò, và khai thác nhiều nhóm effect hơn trong cùng 1 kỹ năng (ví dụ 1 skill vừa `EFF_DMG_AOE` vừa `EFF_SLOW` vừa `EFF_SHIELD` cho bản thân — đúng cấu trúc `danh_sach_hieu_ung` đã có). Đây là `PLAYTEST-VERIFIABLE` guidance, không phải acceptance invariant.

**Không đổi**: số skill trang bị tối đa vẫn 4 (như mọi Class), Nội tại vẫn đúng 1 trigger/Class (schema `noi_tai_class` không đổi ngoài việc thêm cột `dac_trung_rieng`), không có effect/trigger/timing mới ngoài 19 effect + 3 `thoi_diem` đã khoá (mục 0.7.6), không sửa Shared Combat Engine chỉ để phục vụ SSS — SSS vẫn chịu đúng ATB/MP/cooldown/target/CC/death như mọi actor.

Kiểm chứng phần định lượng (gap tổng thể Layer1+Layer2) bằng Sandbox AI-vs-AI (mục 3.8, so SSS với S/SS cùng điều kiện) sau khi đã seed thật — phần cờ `dac_trung_rieng` kiểm chứng được ngay bằng schema/Dev Mode, không cần playtest.

---

## 0.8.5 Khống chế (CC) trong 3v3 — Kháng CC (mới v1.8.0)

**Vấn đề:** ở 3v3 một STUN lấy đi ≈ 1/3 khả năng hành động của đội trong thời gian hiệu lực; và v1.7.0 cho cast lại CC đang hiệu lực làm *refresh* (mục K) nên một chuỗi STUN có thể khoá một actor vô hạn.

**Phạm vi:** "CC khoá" = `EFF_STUN`, `EFF_SILENCE`, `EFF_ROOT`. `EFF_SLOW` không phải CC khoá (đã bị giới hạn bởi clamp SPD ở 0.8.1.H). Giải pháp dùng **một bộ đếm duy nhất**, không thêm effect mới.

1. **Một CC khoá tại một thời điểm:** actor đang mang bất kỳ CC khoá nào thì mọi cast CC khoá lên actor đó (kể cả khác mã) không có tác dụng — log `bi_bo_qua: DANG_MANG_CC`.
2. **Kháng CC:** mỗi actor có bộ đếm `khang_cc` (int, mặc định 0). Khi CC khoá trên actor bị gỡ — hết `so_luot` **hoặc** bị `EFF_CLEANSE` — đặt `khang_cc = KHANG_CC_SO_LUOT = 2`. Khi `khang_cc > 0`, mọi cast CC khoá lên actor đó không có tác dụng — log `bi_bo_qua: KHANG_CC`; các effect khác của skill vẫn áp dụng, MP/cooldown không hoàn lại.
3. **Nhịp giảm:** ở bước 12a (mục 1.5.3), khi actor hoàn tất lượt của chính mình: **trước hết** giảm `khang_cc` (nếu > 0) đi 1, **sau đó** mới xử lý gỡ effect hết hạn và đặt `khang_cc = 2` cho CC vừa hết hạn. Nếu CC bị CLEANSE giữa lượt của actor khác thì đặt `khang_cc = 2` ngay và bắt đầu giảm từ cuối lượt kế tiếp của chính actor đó.
4. **Trần thời lượng (Dev validation):** `so_luot` của STUN/SILENCE/ROOT ≤ 2.
5. **Không CC diện rộng:** effect CC khoá không được có `doi_tuong = TAT_CA_DICH` (chỉ `MOT_DICH` hoặc `NGAU_NHIEN_N_DICH`). Một AOE STUN lên 3 địch sẽ là hard-lock cả đội.

**Invariants (kiểm bằng test):**
- **INV-CC-1:** mỗi actor mang tối đa 1 CC khoá tại một thời điểm.
- **INV-CC-2:** chuỗi lượt bị CC khoá liên tiếp của một actor ≤ 2, và sau đó actor có **≥ 2 lượt của chính nó** không thể bị CC khoá. Hệ quả: tỉ lệ lượt bị CC khoá của một actor **≤ 50%**, không tồn tại infinite lock dù nhiều đối thủ cùng dồn CC.

UI hiển thị `khang_cc` như một trạng thái trên actor ("Kháng CC (n)") để người chơi hiểu vì sao CC không ăn.

---

## 0.8.6 Hương Hỏa, Hero preset & Linh Thần (SSS) — cập nhật v2.4.0

### A. Phân biệt 3 loại nhân vật người chơi

1. **Nhân vật tự tạo (`THUONG`, `la_hero_preset=false`)**: người chơi chọn Class → tên → điểm → ngoại hình → skill; lưu xong roll `B/A/S` theo `{60/30/10}`. Miễn phí và không giới hạn.
2. **Hero preset (`THUONG`, `la_hero_preset=true`)**: nhân vật cổ tích/truyền thuyết Việt Nam do game tác giả hoá sẵn, có tier cố định `B/A/S/SS`. Người chơi nhận qua Triệu Hồi Khởi Đầu hoặc mở trực tiếp bằng Hương Hỏa. Không chỉnh class/tier/tên; chỉ được phân bổ lại 5 điểm và chọn skill trang bị như nhân vật thường.
3. **Linh Thần (`LINH_THAN`)**: tier `SSS`, 4 vị seed cố định, chỉ mở bằng 300 Hương Hỏa tại Bách Thần Điện. Không xuất hiện trong gacha.

**Hero preset không phải một hệ combat mới**: vẫn là `class` + `noi_tai_class` + `ky_nang`, đi qua nguyên Shared Combat Engine. Khác biệt duy nhất là nguồn mở khóa và tier được seed cố định.

### B. Triệu Hồi Khởi Đầu — gacha miễn phí 1 lần

Mỗi `nguoi_choi_local` mới có đúng **1 gói 10 lượt**. Gói này được coi là một phần onboarding roster, không phải hệ thống kiếm tiền.

- Pool: 20 Hero preset `B/A/S/SS` ở mục 1.7.
- 10 kết quả đều là **Hero khác nhau**; nếu RNG chọn Hero đã xuất hiện trong chính gói thì bỏ kết quả đó và tiêu thụ lại một lần rút bằng PRNG gacha — không tạo duplicate.
- Trong 10 kết quả: **ít nhất 1 Hero tier S hoặc SS** và **ít nhất 1 Hero tier A/S/SS**. Hai điều kiện có thể cùng do một Hero S/SS thỏa; implementation nên chọn UX dễ hiểu là hiển thị huy hiệu "Đảm bảo S+" và "Đảm bảo A+".
- Trọng số cơ sở cho mỗi lượt chưa thuộc hai slot bảo đảm: `B=60, A=30, S=9, SS=1`. Đây là **BALANCE SEED**, không phải invariant kiến trúc.
- Không có nút bỏ lượt, reroll, làm mới pool, banner xoay vòng, pity, tiền thật, premium currency hoặc đổi duplicate thành Hương Hỏa.
- `da_nhan_trieu_hoi_khoi_dau=false` → cho phép nhận. Sau khi tạo đủ 10 Hero thành công, chuyển thành `true` trong cùng thao tác nguyên tử. Reload/crash/retry không được cấp lần hai.
- Gacha RNG **tách khỏi combat RNG**: không dùng `rng_seed/rng_state` của trận; dùng RNG ngoài combat phù hợp với runtime. Kết quả cuối phải được lưu trước khi UI coi gói đã nhận thành công.

### C. Mở Hero preset bằng Hương Hỏa — direct choice

| Tier Hero | Chi phí Hương Hỏa | Cảm giác |
|---|---:|---|
| B | 15 | dễ bổ sung roster |
| A | 30 | lựa chọn đáng cân nhắc |
| S | 50 | mạnh, giá vừa phải |
| SS | 80 | Hero hiếm, giá cao nhất trong nhóm Hero |
| SSS Linh Thần | 300 | tầng Thần, Bách Thần Điện |

- Màn **Kho Báu Cổ Tích** (tên UI có thể đổi) liệt kê Hero preset chưa mở và đã mở.
- Chọn Hero → xem preview kit → xác nhận → gọi `mo_khoa_hero_preset(class_id)` → kiểm tra Hero chưa sở hữu + đủ Hương Hỏa → trừ đúng chi phí → tạo `nhan_vat` với tier seed cố định trong một thao tác nguyên tử.
- Không cho mua Hero đã sở hữu; không random khi dùng Hương Hỏa.
- Hương Hỏa **không có nguồn mới**. 3 màn MVP vẫn cho tổng 300. Người chơi phải tự quyết định: dùng một phần Hương Hỏa cho Hero preset hay giữ đủ 300 để thỉnh một Linh Thần.
- Vì đây là lựa chọn sản phẩm, UI phải hiển thị rõ: **"Mở Hero trước sẽ làm chậm/hoặc trì hoãn việc thỉnh Linh Thần."** Không được trình bày như phần thưởng miễn phí.

### D. Tier của nhân vật tự tạo và Hero preset


> Re-open quyết định `DO NOT ADD` của ADR-07/v2.0.1 với premise mới: **chỉ first-clear, mỗi màn một lần, không có nguồn lặp lại** (v2.2.0: bỏ hẳn "mục tiêu phụ" từng thêm ở v2.1.0 — một nguồn duy nhất, một invariant duy nhất, dễ audit/test hơn). Audit anti-farming ở mục 4.4c vẫn đúng cho premise gốc (thưởng theo mọi lần thắng) — premise này không rơi vào faucet đó vì phần thưởng không gắn với hành động lặp lại được (Đấu lại/Rematch), mà gắn với **trạng thái tiến độ** (`da_hoan_thanh`) vốn đã idempotent theo thiết kế từ `tien_do_di_ai` (0.7.13).

### E. Tier của nhân vật tự tạo (`THUONG`)
- Khi lưu **nhân vật tự tạo** (cả tạo mới lẫn ~~sửa~~ — **tier không đổi khi sửa**, chỉ roll lúc tạo), server roll `tier ∈ {B, A, S}` theo `trong_so_tier_tao_moi` (mục 0.7.13b) bằng RNG server-side (không phải Shared Combat Engine — đây là lúc tạo nhân vật, ngoài một trận đấu, không cần seed theo trận; dùng CSPRNG của server, không cần deterministic).
- Không có reroll, không có cost reroll ở v1 — xoá nhân vật (`THUONG`) và tạo lại là cách duy nhất thử vận may khác; chấp nhận được vì khoảng lệch giữa B và S (tối đa +10%, mục 0.8.4.B) nhỏ hơn khoảng Stat Allocation có thể bù (2 điểm ≈ +12%).
- UI Bước "Xem lại & xác nhận" (mục 1.3) hiển thị kết quả roll **sau khi** xác nhận lưu (không cho thấy trước để tránh cảm giác "hủy để roll lại" dù không tốn gì — giữ trải nghiệm gọn).

### F. Linh Thần (`class.phan_loai = LINH_THAN`) & Bách Thần Điện
- Linh Thần là Class riêng, `tier = SSS` cố định, tên/ngoại hình cố định (`class.ten_co_dinh`/`ngoai_hinh_co_dinh`), có Nội tại + skill riêng do Dev Mode tác giả (≥ 4 skill `HOAT_DONG`) — **không** roll, **không** nằm trong luồng tạo nhân vật 5 bước (Bước 1 chỉ liệt kê Class `THUONG`).
- **Bách Thần Điện** (màn hình mới, mục 1.4b): liệt kê mọi Class `LINH_THAN` đang `HOAT_DONG`, hiển thị đã mở/chưa mở, cho phép **chọn trực tiếp** 1 Linh Thần chưa mở để mở bằng đúng `chi_phi_linh_than` Hương Hỏa (mục 0.7.13b) — **không random, không gacha** (đúng ý định "người chơi cân nhắc chọn vị Thần nào"). Mở xong tạo 1 bản ghi `nhan_vat` (`class_id` = Linh Thần đó, `tier = SSS`, tên/ngoại hình sao chép từ `class`), trừ đúng `chi_phi_linh_than` khỏi `vi_huong_hoa.so_du`, ghi `class_id` vào `linh_than_da_mo` — server thực hiện trong 1 giao dịch: không đủ số dư → từ chối toàn bộ, không trừ một phần.
- Không có Shop generic (không inventory, không rotation, không currency bundle) — đúng như premise, chỉ là 1 màn chọn-trực-tiếp.

### G. Nguồn Hương Hỏa — DUY NHẤT 1 nguồn, hữu hạn (chốt lại ở v2.2.0, bỏ "mục tiêu phụ" của v2.1.0)
| Nguồn | Số lần tối đa/màn | Idempotency key |
|---|---|---|
| First-clear màn Đi ải | 1 | `tien_do_di_ai.da_hoan_thanh: false→true` |

Không có nguồn nào khác ở v1 (không Replay/Rematch/Retry, không PvE Đối kháng, không PvP, không mục tiêu phụ/achievement/event/login/daily/weekly). Sau khi first-clear hết mọi màn trong MVP, Hương Hỏa **dừng tăng vĩnh viễn** cho tới khi có nội dung mới (thêm màn bằng Content Bundle) — đây là **content gate có chủ đích**, không phải bug (mục H, mục 4.4).

### H. Cấp thưởng — nguyên tử với kết thúc trận (đóng câu hỏi "grant ở đâu")
Trong **cùng bước 14** của `thuc_hien_luot_danh` (transaction COMMIT kết thúc trận, mục 1.5.3) — chỉ khi `loai_tran = PVE_DI_AI` và `ket_qua = CO_BEN_THANG` với `actor_ids_thang` chứa toàn bộ đội người chơi:
```text
grant = 0
neu tien_do_di_ai(man_choi_id).da_hoan_thanh == false:
    da_hoan_thanh := true; hoan_thanh_luc := now()
    grant := man_choi.huong_hoa_first_clear
    vi_huong_hoa.so_du += grant
ket_qua_tien_trinh := {huong_hoa_nhan: grant, first_clear: (grant > 0)}
```
Vì đây là 1 giao dịch với chính việc ghi `KET_THUC`, **không tồn tại thời điểm nào trận đã kết thúc mà phần thưởng chưa được tính** — loại bỏ toàn bộ nhóm lỗi "app crash giữa lúc trao thưởng". Không có điều kiện nào khác phải đọc từ log trận (không còn mục tiêu phụ) — công thức chỉ phụ thuộc đúng 1 cờ `da_hoan_thanh`.

### I. `INV-PVE-1` — First Clear Reward Invariant (đơn giản hoá ở v2.2.0)
> **Một cặp (`nguoi_choi_local_id`, `man_choi_id`) chỉ có thể chuyển `da_hoan_thanh: false→true` đúng một lần.** Replay / Rematch / Retry / "Đấu lại màn này" / khởi động lại app / duplicate request / crash-rồi-thử-lại — không có hành động nào trong số này tạo ra lần cấp thứ hai, vì mọi lần cấp đều gated bằng đúng cờ idempotent này, được ghi trong transaction DB (Online) hoặc ghi nguyên tử tương đương (Local, mục 0.2). PvE Đối kháng, PvP: không bao giờ tạo Hương Hỏa (không có `man_choi_id`/`tien_do_di_ai` để gắn vào). Đây là invariant **duy nhất** của economy (không còn invariant thứ hai cho mục tiêu phụ như v2.1.0).

### J. Economy sanity check (số liệu thật lấy từ seed mục 1.7, không giả định)
| | Giá trị |
|---|---|
| Số màn Đi ải trong seed MVP | 3 (mục 1.7) |
| First-clear/màn | 100 mỗi màn → tổng **300** |
| Tổng Hương Hỏa tối đa trong MVP | **300** |
| `chi_phi_linh_than` | **300** (mục 0.7.13b) |
| Số Linh Thần mở được từ toàn bộ first-clear MVP | **đúng 1** |
| Linh Thần thứ 2, 3, 4 | **Chưa có nguồn nào trong MVP** — content gate có chủ đích (mục H), không phải thiếu sót |
| Số dư sau khi mở Linh Thần đầu tiên | **0** |
| Làm tròn/phân số | Không — mọi giá trị Hương Hỏa là số nguyên, không chia |

Đây là **dữ liệu seed** (mục 1.7, `man_choi.huong_hoa_first_clear`, `cau_hinh_he_thong.chi_phi_linh_than`) — đổi số qua Content Bundle, không đổi công thức ở mục C/D. Người chơi hoàn thành toàn bộ MVP PvE nhận đúng 300 Hương Hỏa, đủ mở đúng 1 trong 4 Linh Thần theo lựa chọn của họ (mục 1.4b); 3 Linh Thần còn lại hiển thị khoá, chờ nội dung tương lai (mục I).

### K. SSS không bypass Combat Engine
Linh Thần vẫn là một actor bình thường trong `actors[]`: chịu đúng ATB, MP, cooldown, CC (kể cả `INV-CC-1/2`), targeting, effect, snapshot, death, victory — không có nhánh code hay effect ngoại lệ nào cho `tier = SSS`. Sức mạnh chỉ đến từ (1) hệ số tier 1.22 trên HP/ATK/DEF nền — Layer 1, mục 0.8.4.B, cùng cơ chế với tier C/B/A/S/SS, không phải "công thức riêng" — và (2) đặc điểm kit bắt buộc (`dac_trung_rieng = true`) + ngân sách tham số cao hơn — Layer 2, mục 0.8.4.G (không phải cơ chế mới — vẫn là 1 Nội tại + ≤ 4 skill trang bị như mọi Class). `so_linh_than_toi_da_moi_doi = 1` (mục 0.7.13b) giữ đội hình vẫn cần ≥ 2 nhân vật `THUONG` — Stat Allocation/build variety của phần còn lại trong đội không mất ý nghĩa (đúng câu hỏi ở mục 16 của audit gốc: SSS không biến các nhân vật khác thành "rác").

### L. Toàn vẹn dữ liệu local — nói đúng, không tuyên bố an toàn
`vi_huong_hoa`, `tien_do_di_ai`, `nhan_vat.tier` là **local, không có server-authoritative anti-tamper**, đúng bản chất Local Runtime (0.2, ADR-01). Người chơi có thể tự sửa số dư/tier/mở khoá trên thiết bị của chính mình — với game chơi trong nhóm bạn (mục 0.1b), đây là giới hạn chấp nhận được của single-player save, **không** phải lỗ hổng cần vá. Ranh giới duy nhất được bảo vệ: phòng `che_do_tier = CAN_BANG` (ADR-08) luôn vô hiệu hệ số tier (kể cả Linh Thần, tính như tier B) bất kể dữ liệu local nói gì — nên việc "tự sửa" chỉ ảnh hưởng trải nghiệm PvE một người và phòng `TU_DO` mà chính nhóm bạn đã đồng ý chơi kiểu tự do.

### M. ⚠️ CẦN PLAYTEST (không tự chốt bằng suy luận)
- `trong_so_tier_tao_moi = {60,30,10}`, toàn bộ `he_so_tier` (6 giá trị C→SSS), `chi_phi_linh_than = 300`, `huong_hoa_first_clear` mỗi màn đều là **giá trị khởi điểm**, chỉnh qua Content Bundle (0.7.13b, 0.6a) sau playtest, không phải hằng số vĩnh viễn.
- Bước nhảy SS→SSS (+9 điểm %, mục 0.8.4.B, đã làm mượt ở v2.3.0) cộng với đặc điểm kit bắt buộc (mục 0.8.4.G) có đủ tạo cảm giác "SSS khác biệt rõ rệt" mà vẫn còn counterplay hay không, và ngân sách tham số hướng dẫn (+20-30%, vẫn chỉ là guidance) có cần siết chặt hơn hay không — chỉ playtest thật trả lời được, không suy luận trên giấy.
- Có nên mở rộng thêm màn Đi ải để có nguồn Hương Hỏa cho Linh Thần thứ 2–4, hay giữ nguyên content gate 1-Linh-Thần — quyết định sản phẩm, không kỹ thuật (mục 4.4).

---


## 0.9 Quy tắc render ngoại hình (paper-doll)

- Thứ tự vẽ chồng lớp (từ dưới lên): Thân (Áo, Quần) → Trang sức → Đầu (Tóc vẽ sau Mặt, hoặc theo thứ tự phù hợp với bộ ảnh thực tế do Dev Mode upload).
- **Màu da không lưu thành ảnh riêng.** Ảnh gốc trong `ngoai_hinh_asset` là ảnh trung tính; màu da áp dụng bằng bộ lọc (`mau_da_preset.gia_tri_tint`) tại thời điểm hiển thị (CSS filter hoặc canvas tint), áp cho toàn bộ phần da hiển thị trên nhân vật.
- Lọc danh sách `ngoai_hinh_asset` hiển thị cho người chơi chọn theo `gioi_tinh_tuong_thich` khớp với `gioi_tinh` đã chọn của nhân vật (hoặc `CA_HAI`).

---

## 0.10 State machine

### 0.10.1 `tran_dau.trang_thai`
```
DANG_DIEN_RA → KET_THUC (ket_qua = CO_BEN_THANG | HOA, kèm actor_ids_thang — xem mục 0.7.13)
```
Không có trạng thái tạm dừng giữa chừng; một trận bắt đầu là chạy đến khi có kết quả.

### 0.10.2 `phong_choi.trang_thai`
```
CHO_NGUOI_CHOI_2 --có người tham gia--> SAN_SANG --cả 2 xác nhận sẵn sàng--> DANG_CHOI --trận kết thúc--> KET_THUC
CHO_NGUOI_CHOI_2 --người tạo huỷ phòng--> DA_HUY
```

---

## 0.11 Tiêu chí nghiệm thu phân hệ (dùng chung)

- [ ] Mọi bảng ở mục 7 tồn tại đúng cột, đúng kiểu, đúng ràng buộc khoá ngoại.
- [ ] 19 hiệu ứng ở mục 8 được seed đầy đủ, đúng mã, đúng nhóm, đúng schema tham số.
- [ ] Tạo một `ky_nang` với `danh_sach_hieu_ung` gồm 2 hiệu ứng trở lên → áp dụng đúng thứ tự trong mảng, không đảo thứ tự.
- [ ] `nhan_vat.ky_nang_trang_bi` không cho lưu quá 4 phần tử, không cho lưu skill không thuộc `class_id` của nhân vật — kiểm tra ở phía server, thử gửi trực tiếp API với dữ liệu sai để xác nhận bị chặn.
- [ ] Đổi `gioi_tinh` của nhân vật → danh sách ngoại hình khả dụng lọc lại đúng theo `gioi_tinh_tuong_thich`.
- [ ] Đổi `mau_da_id` → toàn bộ phần da trên nhân vật đổi màu đồng nhất, không cần đổi ảnh gốc.
- [ ] Hai request đồng thời cùng thực hiện một lượt → tối đa một request thành công; không thể đánh hai lần do race condition (xem invariant khoá bản ghi ở mục 1.5.3 bước 0).
- [ ] Reload giữa trận → trạng thái HP/khiên/buff-debuff/DOT-HOT/cooldown/turn được khôi phục từ server.
- [ ] Mọi mutation combat đều kiểm tra quyền điều khiển actor ở server.

---

## 0.12 Tiêu chí nghiệm thu bổ sung v1.6 (P0 — audit trước build)

- [ ] `hoi_chieu_luot = 0`: skill dùng lại được ngay lượt kế tiếp của actor.
- [ ] `hoi_chieu_luot = 1`: skill dùng ở lượt A1 → còn khoá ở A2 → dùng lại được ở A3.
- [ ] `hoi_chieu_luot = 2`: đúng ví dụ số ở mục 1.5 #4 (khoá ở A2, A3, dùng lại được ở A4).
- [ ] Actor bị STUN ở lượt của chính nó (BỎ_LƯỢT tự động) → cooldown skill khác của actor đó vẫn giảm đúng 1.
- [ ] Actor BỎ_LƯỢT chủ động (không bị STUN/SILENCE) → cooldown skill khác vẫn giảm đúng 1 (không có ngoại lệ).
- [ ] `EFF_STUN so_luot = 1`: actor bị stun đúng 1 lần BỎ_LƯỢT rồi hành động bình thường ngay lần kế tiếp.
- [ ] `EFF_STUN so_luot = 2`: đúng ví dụ số ở mục 0.8.1.M (2 lần BỎ_LƯỢT rồi hành động bình thường ở lần thứ 3 actor được ATB chọn) — không còn tình trạng chỉ có 1 lần BỎ_LƯỢT như mô tả sai ở v1.6.
- [ ] `EFF_SILENCE`/`EFF_ROOT`/`EFF_SLOW`/`EFF_BUFF_*`/`EFF_DEBUFF_*` với `so_luot = 1`: vẫn có hiệu lực đầy đủ trong toàn bộ lượt kế tiếp của carrier (được kiểm tra/áp dụng cho hành động lượt đó), chỉ hết hiệu lực từ lượt sau đó — không bị gỡ sớm trước khi lượt kế tiếp diễn ra.
- [ ] PvP: actor A tới lượt và đang bị STUN, hoặc SILENCE mà không còn skill hợp lệ → server tự BỎ_LƯỢT ngay trong request đã kích hoạt trạng thái đó (ví dụ request cast STUN của đối thủ), không cần actor A hay bất kỳ ai gửi thêm request, không cần chờ tới hạn `han_luot_luc` 90 giây.
- [ ] SILENCE + không còn skill hợp lệ (cooldown/nhóm bị cấm loại hết → lý do `BI_SILENCE`; chỉ còn thiếu MP → `KHONG_DU_MP`) → server tự BỎ_LƯỢT (bước 4.5b/4.5c), không trả lỗi "không có skill hợp lệ" cho client và không chờ client chọn.
- [ ] ROOT không có skill hợp lệ → vẫn chờ client tự gửi BỎ_LƯỢT tường minh (theo mục 0.8.1.G), server không tự động thay.
- [ ] Chuỗi auto-resolve nhiều actor liên tiếp (ví dụ AI ngay sau một actor bị STUN) đều được xử lý trong cùng vòng đời request/application của lượt kích hoạt, không actor nào trong chuỗi phải chờ một request bên ngoài riêng — nhưng mỗi actor trong chuỗi vẫn là một transaction DB độc lập (xem test transaction riêng ngay dưới).
- [ ] Mỗi lượt auto-pass do STUN/SILENCE/AI đều tạo một phần tử `nhat_ky_luot_danh` riêng và tăng `so_luot` đúng 1, giống hệt một lượt bình thường do client gửi.
- [ ] **(P0 v1.6.2)** Lượt A gây STUN cho B (transaction #1) phải COMMIT xong trước khi bất kỳ auto-pass nào của B bắt đầu — kiểm tra bằng cách chèn lỗi/delay giả lập ngay sau COMMIT #1 và xác nhận transaction #2 (auto-pass B) chỉ mở SAU khi #1 đã COMMIT (quan sát qua log thời điểm mở transaction, không dựa suy luận).
- [ ] **(P0 v1.6.2)** Nếu sau auto-pass B tiếp tục có lượt AI, lượt AI chạy ở transaction #3, mở sau khi transaction #2 (auto-pass B) đã COMMIT — không có transaction nào lồng bên trong transaction khác trong toàn chuỗi.
- [ ] **(P0 v1.6.2)** Mỗi transaction trong chuỗi (#1, #2, #3, ...) tăng `so_luot` đúng 1 theo đúng thứ tự tuần tự, và client Realtime nhận được các version tăng dần tương ứng (không nhận gộp, không nhận nhảy cóc).
- [ ] **(P0 v1.6.2)** Không có nested transaction / partial commit ở bất kỳ đâu trong chuỗi auto-resolve — xác nhận bằng cách kiểm tra mỗi invocation `thuc_hien_luot_danh` trong chuỗi có transaction ID (hoặc tương đương) khác nhau.
- [ ] **(P0 v1.6.2)** Nếu một invocation auto-resolve giữa chuỗi thất bại (transaction của chính nó ROLLBACK), các transaction đã COMMIT trước đó trong chuỗi (kể cả lượt gốc gây STUN/SILENCE) vẫn giữ nguyên trạng thái đã COMMIT — không bị rollback ngược theo.
- [ ] TIMEOUT resolution làm tăng `so_luot` đúng 1 trong cùng transaction ghi `KET_THUC`.
- [ ] Client đang giữ `so_luot = 10`, server resolve TIMEOUT và phát event `KET_THUC` với `so_luot = 11` → client áp dụng được (không bị coi là event cũ/trùng).
- [ ] Event Realtime có `so_luot` ≤ `so_luot` hiện tại của client (dù là lượt thường, auto-pass hay TIMEOUT) → client bỏ qua.
- [ ] Buff/debuff nhóm A (BUFF_ATK/DEF/SPD, DEBUFF_ATK/DEF, SLOW, SILENCE, ROOT) không giảm `so_luot` nếu actor mang effect chưa được ATB chọn tới lượt, dù nhiều lượt toàn trận đã trôi qua.
- [ ] DOT/HOT tick đúng số lần bằng `so_luot`, giảm theo lượt toàn trận (không phải lượt riêng của actor mang effect) — kiểm thử với 1 actor SPD thấp mang DOT trong khi actor khác SPD cao đi nhiều lượt.
- [ ] Effect DOT/HOT vừa tạo trong lượt hiện tại không tick ngay trong chính lượt tạo ra nó.
- [ ] Actor bị damage trực tiếp chết ngay trong bước effect (bước 7), có DOT/HOT còn hiệu lực → DOT/HOT đó không tick ở bước 9 của lượt này.
- [ ] Tạo skill ở Dev Mode chọn `thoi_diem = KHI_DANH_TRUNG` hoặc `BI_DONG_DAU_TRAN` → bị từ chối lưu, đúng mục 0.8.3.
- [ ] Class hoạt động luôn có đúng 1 Passive; Passive `BAT_DAU_TRAN` chỉ chạy đúng 1 lần khi bắt đầu trận, không chạy lại do reload/reconnect.
- [ ] Passive `BAT_DAU_LUOT` chạy đúng trước input của lượt chủ sở hữu và không tạo thêm lượt/transaction.
- [ ] Passive `KHI_GAY_SAT_THUONG`/`KHI_NHAN_SAT_THUONG` chỉ chạy khi sát thương HP thực tế > 0 và không tự chain vô hạn.
- [ ] Đội hình lệch quân số (ví dụ 1v3, 2v3) hoặc đủ 3v3: dàn dựng DOT/HOT cuối lượt làm actor sống cuối cùng của cả hai đội cùng chết → `ket_qua = HOA`, `actor_ids_thang = []`.
- [ ] **(BẢO LƯU — Co-op, không nghiệm thu ở v1.8.0)** Co-op 2v1: DOT/HOT cuối lượt hạ AI và người chơi cuối cùng cùng lúc → theo phương án ở mục 1.5.5 (mặc định: người chơi thắng).
- [ ] Đăng nhập bằng người chơi A, gửi `nguoi_thuc_hien_id`/actor thuộc người chơi B → server từ chối.
- [ ] Gọi trực tiếp API/RLS cố UPDATE `trang_thai_chien_dau`, `actor_dang_di`, hoặc HP/MP/shield trong `tran_dau` từ client role → bị từ chối.
- [ ] PvP: actor A tới lượt, không gửi hành động > 90 giây, không refresh client nào → lần request kế tiếp chạm vào trận (từ A, từ B, hoặc reconnect) phải resolve TIMEOUT trước khi trả kết quả, đúng bất biến ở mục 2.5.
- [ ] Client nhận event Realtime có `so_luot` nhỏ hơn `so_luot` hiện tại (ví dụ đến muộn sau reconnect) → event đó bị bỏ qua, không áp dụng lên state.
- [ ] Snapshot trận không fallback sang bảng `class`/`ky_nang`/`man_choi` sống trong bất kỳ trường hợp nào, kể cả khi snapshot thiếu dữ liệu bất thường (server từ chối hành động thay vì tự lấy bù).
- [ ] `NGAU_NHIEN_N_DICH` luôn chọn đúng 1 target ngẫu nhiên do server sinh, ghi rõ target được chọn vào `nhat_ky_luot_danh`.
- [ ] Skill có 2 effect với `doi_tuong` khác nhau cùng cần `target_actor_id` riêng (`MOT_DICH` + `MOT_DONG_DOI`) → Dev Mode chặn lưu skill đó.
- [ ] `KHI_DANH_TRUNG`: xác nhận không skill nào trong seed dữ liệu Phần 1 dùng giá trị này (vì bị cấm).
- [ ] `BI_DONG_DAU_TRAN`: xác nhận không skill nào trong seed dữ liệu Phần 1 dùng giá trị này (vì bị cấm).

---

## 0.13 Triết lý thiết kế & Nguyên tắc cân bằng (mới v1.8.0)

### 0.13.1 Gameplay Philosophy
- **Counter ≠ Hard Counter.** Một nhân vật có thể có lợi thế trước nhân vật khác nhưng không được biến thành "gặp đúng counter = không được chơi". Chuỗi mong muốn: *counter → đồng đội hỗ trợ → đổi mục tiêu → bảo vệ → focus → phản counter → phối hợp*. Chuỗi không mong muốn: *3 người đánh 1 người → chết ngay → snowball*.
- **Nguồn replayability chính (không thêm hệ thống tiến trình):** Class × Passive × Stat Allocation × 4 Skill × Team Composition × Target Priority × Opponent Composition × Skill Timing.
- **Team composition là emergent, không role lock:** pressure, control, sustain, protection, burst, tempo là *design intent* để Dev thiết kế Class/Skill, không phải role bắt buộc (không có luật "phải có Tank/Healer").
- **Thứ tự ưu tiên khi phải chọn:** combat sâu/rõ/cân bằng hơn > thêm feature; rule đơn giản dễ test > công thức phức tạp; soft counter > hard counter; build/team diversity > power progression; nếu scope phình → đưa vào roadmap (4.4).

### 0.13.2 Công cụ counterplay đã có sẵn (không thêm effect mới)

| Nhu cầu | Công cụ trong registry 19 effect | Ghi chú 3v3 |
|---|---|---|
| Bảo vệ đồng đội bị focus | `EFF_SHIELD`, `EFF_HEAL`, `EFF_HOT`, `EFF_BUFF_DEF` với `doi_tuong = MOT_DONG_DOI`/`TAT_CA_DONG_DOI` | Trần khiên 50% HP (0.8.1.I) |
| Phản counter / cắt mối đe dọa | `EFF_STUN`, `EFF_SILENCE`, `EFF_ROOT`, `EFF_SLOW`, `EFF_DEBUFF_ATK` lên actor gây sát thương chính | Có Kháng CC (0.8.5) |
| Giải khống chế đồng đội | `EFF_CLEANSE` (ưu tiên gỡ `KHONG_CHE`) | Cấp `khang_cc` cho mục tiêu |
| Phá tempo / phá buff | `EFF_DISPEL`, `EFF_SLOW`, `EFF_DEBUFF_*` | |
| Đổi mục tiêu | Người chơi tự chọn `target_actor_id`; **không có auto-focus** vào actor SPD cao nhất (AI cũng dùng scoring, mục 1.5.4) | |

⚠️ Giả định: Skill Editor cho phép chọn `doi_tuong` bất kỳ trong enum (mục 0.7.7) cho mỗi effect, `doi_tuong_mac_dinh` của registry chỉ là giá trị mặc định (đúng với mục 3.4 bước 3 của v1.7.0). Đây là điều kiện để các công cụ bảo vệ đồng đội tồn tại.

### 0.13.3 Chuỗi guardrail chống snowball

| Rủi ro | Guardrail | Mục |
|---|---|---|
| SPD snowball | Tỉ lệ SPD nền giữa các Class ≤ 2:1; SPD allocation chỉ +3%/điểm (tối đa +6%); clamp `spd_hien_tai` ∈ [50%, 150%] gốc; **trần lượt liên tiếp** actor ≤ 2 / đội ≤ 3; trần gauge 2×`NGUONG` | 0.7.3, 0.8.4, 0.8.1.H, 1.5.0 |
| CC lock | Một CC khoá/actor, Kháng CC 2 lượt, `so_luot` ≤ 2, không CC khoá diện rộng, cleanse ưu tiên `KHONG_CHE` | 0.8.5, 0.8.1.J |
| Focus fire / alpha strike | Trần lượt liên tiếp của đội (địch không thể hành động > 3 lần liên tiếp) **nếu đội đối phương còn ít nhất 1 actor sống đủ điều kiện được ATB chọn** — đây là giới hạn tần suất hành động, không phải cam kết một actor cụ thể sẽ sống đủ lâu để hành động (3 actor có thể hạ gục toàn bộ đội kia trước khi trần kích hoạt nếu combat state cho phép — theo dõi qua metric Dead-before-acting); shield/heal/DEF lên đồng đội; **không** giảm sát thương toàn cục | 1.5.0, 0.8.1.I |
| Shield bất tử | Trần khiên 50% HP tối đa | 0.8.1.I |
| Passive chain | Chain depth = 1; DOT/HOT không kích hoạt passive | 0.8.2 |
| Trận kéo dài vô hạn | `GIOI_HAN_HANH_DONG = 150` | 1.5.5 |

### 0.13.4 Balance Principles — không có build tuyệt đối
Không nên tồn tại một tổ hợp Class + Skill + Stat luôn tối ưu; mọi lựa chọn phải có trade-off:
- **SPD cao:** đi sớm hơn, nhưng allocation bị giới hạn và actor nhanh trở thành target ưu tiên tự nhiên của đối phương (không cần penalty nhân tạo).
- **ATK cao:** burst tốt, nhưng bỏ cơ hội đầu tư HP/DEF/SPD.
- **DEF/HP cao:** sống lâu, nhưng giảm áp lực nếu skill không scale phù hợp.
- Không cần giảm stat này khi tăng stat khác: **ngân sách 5 điểm + trần 2 điểm/stat** đã tạo trade-off.
- **Counter mềm (ví dụ):** Assassin có lợi thế trước Support, nhưng Support vẫn có counterplay qua đồng đội, target priority, timing skill, shield/heal, CC và cleanse.

**Hướng dẫn thiết kế nội dung** (khuyến nghị khởi điểm cho Dev, *không phải luật engine*; kiểm bằng Sandbox, chỉnh sau playtest):
- Skill AOE / `TAT_CA_DICH`: `he_so` mỗi mục tiêu ≈ 40–50% so với skill đơn mục tiêu cùng MP/cooldown (vì trúng tới 3 mục tiêu).
- Heal/Shield/Buff `TAT_CA_DONG_DOI`: lượng mỗi mục tiêu ≈ 40–50% bản `MOT_DONG_DOI`.
- STUN 2 lượt: cooldown ≥ 3 và MP cao hơn skill sát thương cùng cấp.
- DOT/HOT đếm `so_luot` theo **lượt toàn trận** (0.8.1.M nhóm B): với 6 actor, khoảng 6 action ≈ 1 vòng, nên DOT/HOT trôi nhanh gấp ~3 lần so với 1v1 theo "vòng". Tổng sát thương/hồi máu không đổi nhưng "thời gian" ngắn hơn — cần playtest, xem 4.7.
- Mỗi actor nên thường có ≥ 2 lựa chọn hành động có nghĩa mỗi lượt (Agency, mục 0.14).

---

## 0.14 Gameplay Metrics (mới v1.8.0)

Toàn bộ metric **tính được từ `nhat_ky_luot_danh`, snapshot và trạng thái trận** (kể cả trận Sandbox) bằng truy vấn/view, không cần bảng telemetry mới. **Các ngưỡng bên dưới là experimental thresholds để phát hiện vấn đề, không phải chân lý** — phải được xác nhận/điều chỉnh bằng playtest thực tế.

| Metric | Định nghĩa (nguồn: log) | Ngưỡng thử nghiệm ban đầu |
|---|---|---|
| Match Duration | `ket_thuc_luc − bat_dau_luc` và tổng `so_luot` | Mục tiêu thử nghiệm 3–7 phút/trận |
| Decision Density | % lượt của actor người chơi có `so_lua_chon_hop_le ≥ 2` | Theo dõi xu hướng |
| Forced Pass Rate | % lượt actor có `ly_do_bo_luot ∈ {BI_STUN, BI_SILENCE, KHONG_DU_MP}` (tách theo từng lý do) | Cảnh báo nếu > 20% |
| CC Lock Rate | % lượt của mỗi actor bị CC khoá; chuỗi CC liên tiếp dài nhất | Bất biến ≤ 50% (INV-CC-2); cảnh báo nếu vượt |
| SPD Snowball Rate | % trận có actor đạt chuỗi lượt liên tiếp tối đa (2) ≥ 3 lần | Theo dõi xu hướng |
| Focus Fire Rate | % trận có actor chết trong khi cả 3 actor địch đang sống đều đã gây sát thương HP lên nó trong 6 action gần nhất | Theo dõi xu hướng |
| Dead-before-acting | Số actor chết khi chưa hề hành động lượt nào | Cảnh báo nếu > 15% trận |
| Comeback Rate | % trận đội từng bị dẫn "1 actor sống vs 3" mà vẫn thắng | Theo dõi xu hướng |
| Skill / Class / Build Diversity | Phân bố skill được dùng, Class được chọn, cặp (Stat Allocation, loadout skill) | Cảnh báo nếu một mục chiếm áp đảo |

**Chuyển sang roadmap (không đo được ở v1.8.0):** Rematch Rate, One-More-Game Rate — cần tính năng đấu lại/telemetry sự kiện UI mà hệ thống hiện chưa có; không thêm chỉ để có số liệu.

---

## 0.15 Tiêu chí nghiệm thu v1.8.0 — P0 (bắt buộc) và P1

### P0 — Formation (mới, final patch: mỗi đội 1–3 actor, không bắt buộc đúng 3)
- [ ] Đội hình 0 nhân vật → từ chối. Đội hình 1, 2, hoặc 3 nhân vật → chấp nhận. Đội hình 4 nhân vật trở lên (cùng một đội) → từ chối.
- [ ] PvP: 1v1 → `bat_dau_tran` tạo đúng **2** actor; 1v2 → **3**; 1v3 → **4**; 2v1 → **3**; 2v2 → **4**; 2v3 → **5**; 3v1 → **4**; 3v2 → **5**; 3v3 → **6**. Không có actor dư, không có actor giả lấp slot thiếu.
- [ ] PvE: người chơi 1 vs AI 1 (2 actor), người chơi 1 vs AI 3 (4 actor), người chơi 3 vs AI 1 (4 actor), người chơi 2 vs AI 3 (5 actor), người chơi 3 vs AI 3 (6 actor) — mỗi tổ hợp `bat_dau_tran` thành công với đúng số actor tương ứng, hai bên không cần bằng số lượng.
- [ ] Với mọi tổ hợp trên: ATB không tạo actor giả; target list chỉ chứa actor còn sống thuộc đúng đội; actor chết bị loại khỏi ATB; `victory` đúng theo mục 1.5.5; reconnect đọc đúng số actor thực tế; snapshot chứa đúng số actor thực tế; `nhat_ky_luot_danh` không tham chiếu actor không tồn tại.

### P0 — Team & Victory
- [ ] `bat_dau_tran` (PvE/PvP) tạo đúng số actor theo đội hình 1–3/đội đã chọn (xem nhóm test Formation ở trên) với `actor_id` A1–A{n}/B1–B{n}, `doi`, `vi_tri`, `thu_tu_uu_tien = 2×(vi_tri−1) + (0 nếu DOI_A, 1 nếu DOI_B)` — công thức không đòi hỏi đội kia cũng đủ 3.
- [ ] Đội hình 0 nhân vật, > 3 nhân vật, trùng `nhan_vat_id`, hoặc nhân vật không thuộc người gọi → từ chối, không tạo `tran_dau`. Không thể tạo > 3 actor/đội bằng cách gọi API trực tiếp.
- [ ] Với đội có N actor (N = 1, 2 hoặc 3): mất 1 actor → còn N−1, trận tiếp tục nếu N−1 ≥ 1; mất hết N actor → đội thua, `actor_ids_thang` = toàn bộ N actor đội kia (kể cả actor đã chết). Test cả N=1 (đội thua ngay khi actor duy nhất chết) lẫn N=3 (đội thua khi cả 3 chết).
- [ ] Actor chết không nằm trong tập ứng viên ATB, không tích gauge, không nhận lượt, không dùng skill, passive không kích hoạt.
- [ ] AOE giết 2–3 actor trong một action → `actor_chet[]` ghi đủ theo thứ tự, không còn actor chết trong ATB sau COMMIT, kiểm tra thắng/thua chỉ chạy sau khi toàn bộ effect/passive/DOT/HOT xong.
- [ ] Hai đội cùng bị xóa sổ ở một lần kiểm tra → `HOA`, `actor_ids_thang = []`.
- [ ] Chạm `GIOI_HAN_HANH_DONG` → đội có tổng HP% cao hơn thắng (so sánh phân số bằng nhân chéo số nguyên); bằng nhau → `HOA`. Kịch bản cả hai đội hết MP/`mp_hoi = 0` (toàn auto-pass) vẫn kết thúc đúng.

### P0 — ATB / SPD
- [ ] Mọi actor thực sự tồn tại trong trận (2–6 tùy đội hình 1–3/đội) có gauge riêng; actor SPD cao đi trước, đi được 2 lượt liên tiếp khi SPD ≥ 2× mọi actor khác. Test riêng với trận 1v1 (chỉ 2 actor) để xác nhận thuật toán không giả định có actor thứ 3 nào khác.
- [ ] **INV-ATB-1:** cấu hình cực đoan (Class SPD tỉ lệ 2:1 + `EFF_BUFF_SPD` lên actor nhanh + `EFF_SLOW` lên mọi actor khác) → không actor nào hành động > 2 lượt liên tiếp khi còn actor khác sống.
- [ ] **INV-ATB-2:** đội có mọi actor nhanh hơn đội kia → không đội nào hành động > 3 lượt liên tiếp khi đội kia còn actor sống; actor bị loại tạm khỏi tập ứng viên giữ nguyên gauge (≤ 2×`NGUONG`).
- [ ] `spd_hien_tai` luôn nằm trong `[MAX(1, ROUND(0.5×gốc)), ROUND(1.5×gốc)]` dù cộng dồn nhiều buff/debuff.
- [ ] Class Editor từ chối lưu Class khiến `MAX(spd_nen)/MIN(spd_nen) > 2.0`.

### P0 — Target
- [ ] `MOT_DICH`/`MOT_DONG_DOI` khi có ≥ 2 mục tiêu hợp lệ mà thiếu `target_actor_id` → từ chối; khi chỉ còn 1 mục tiêu hợp lệ → tự resolve.
- [ ] Target đã chết / sai đội / không tồn tại trong trận → từ chối, không âm thầm đổi sang target khác.
- [ ] `lua_chon_hop_le` không chứa actor chết hoặc sai đội; client gửi target ngoài danh sách vẫn bị server từ chối.
- [ ] `TAT_CA_*`/AOE: `target_actor_id` client gửi thừa bị bỏ qua; `NGAU_NHIEN_N_DICH` chọn đúng 1 địch sống do server sinh và ghi log.
- [ ] Skill Editor chặn skill có hai effect cần hai target khác nhau.

### P0 — Stat Allocation
- [ ] `tao_nhan_vat`/`cap_nhat_phan_bo`: tổng ≠ 5, > 2 điểm/stat, số âm, không nguyên → từ chối toàn bộ; gọi trực tiếp DB/API cũng bị chặn (CHECK + server validate).
- [ ] `tinh_chi_so_cuoi` cho đúng ví dụ số ở 0.8.4.B; mỗi điểm luôn cho bonus ≥ 1.
- [ ] Snapshot chứa `chi_so_nen`, `phan_bo_diem`, `he_so_quy_doi`, `chi_so_cuoi`; sau khi trận bắt đầu, `cap_nhat_phan_bo` không đổi actor trong trận đang chạy; trận mới dùng phân bổ mới.
- [ ] Nhân vật legacy `diem_* = 0` vẫn vào trận được (bonus 0) và UI hiển thị "chưa phân bổ"; sau khi phân bổ đủ 5 điểm thì lưu được.

### P0 — Passive
- [ ] Mỗi Class `HOAT_DONG` đúng 1 passive; passive `BAT_DAU_TRAN` xử lý theo `thu_tu_uu_tien`, đúng 1 lần/actor, không chạy lại khi reload/reconnect.
- [ ] Ba trigger `KHI_SU_DUNG_SKILL`/`KHI_GAY_SAT_THUONG`/`KHI_NHAN_SAT_THUONG` có bước thực thi (7c): AOE 3 mục tiêu → `KHI_GAY_SAT_THUONG` của người gây đúng 1 lần, `KHI_NHAN_SAT_THUONG` đúng 1 lần cho mỗi actor mất HP.
- [ ] Effect `NOI_TAI` gây sát thương không kích hoạt passive nào khác (chain depth = 1); DOT/HOT tick không kích hoạt passive sát thương.
- [ ] Nội tại có effect `doi_tuong = MOT_DICH`/`MOT_DONG_DOI` → Dev Mode reject.

### P0 — CC
- [ ] Cast CC khoá lên actor đang mang bất kỳ CC khoá → không tác dụng (`DANG_MANG_CC`).
- [ ] CC hết hạn hoặc bị CLEANSE → `khang_cc = 2`; cast CC khoá trong 2 lượt của chính actor đó → `KHANG_CC`, effect khác của skill vẫn áp dụng, MP/cooldown không hoàn.
- [ ] Mô phỏng 3 actor địch liên tục cast STUN vào cùng một actor → chuỗi lượt bị CC khoá liên tiếp ≤ 2, sau đó ≥ 2 lượt tự do (INV-CC-2).
- [ ] Skill có STUN/SILENCE/ROOT `so_luot > 2` hoặc `doi_tuong = TAT_CA_DICH` → Dev Mode reject.
- [ ] `EFF_CLEANSE` gỡ `KHONG_CHE` trước `EFF_DEBUFF_*`; FIFO trong mỗi tầng. SILENCE/ROOT chỉ ảnh hưởng đúng actor mang.

### P0 — MP / Agency (không trộn lý do)
- [ ] Mọi skill sẵn sàng (HOAT_DONG, cooldown = 0, không bị SILENCE/ROOT chặn) đều thiếu MP → server tự BỎ_LƯỢT `KHONG_DU_MP` — kể cả trong chuỗi auto-resolve (bước 15), không chờ client.
- [ ] Có ≥ 1 skill đủ MP → không auto-pass.
- [ ] Mọi skill chỉ đang cooldown → **không** auto-pass, **không** ghi `KHONG_DU_MP`; người chơi BỎ_LƯỢT chủ động (`CHU_DONG`).
- [ ] STUN + thiếu MP → `BI_STUN`; SILENCE và mọi skill bị cấm → `BI_SILENCE`; SILENCE còn skill được phép nhưng không đủ MP → `KHONG_DU_MP`; ROOT không skill hợp lệ → chờ client, không auto.

### P0 — Focus fire / Shield
- [ ] 3 actor có thể lần lượt nhắm cùng 1 actor; sát thương trừ shield trước rồi HP; damage nhiều mục tiêu trong một action commit nguyên tử.
- [ ] Shield cộng dồn nhưng không vượt 50% `hp_toi_da`; phần vượt bị cắt và ghi log.

### P0 — Snapshot / Reconnect / Concurrency / Transaction
- [ ] Dev sửa Class, Passive, Skill hoặc `phan_bo_diem` sau khi trận bắt đầu → trận đang chạy không đổi (kiểm cho toàn bộ actor thực tế của trận, dù 2 hay 6); không fallback sang bảng sống.
- [ ] Reconnect: `actors[]`, gauge, `chuoi_luot`, `khang_cc`, buff/debuff, cooldown khôi phục đúng; thứ tự lượt kế tiếp giống hệt trước khi mất kết nối.
- [ ] Hai request gần đồng thời cùng nhắm một mục tiêu, hoặc gửi cho actor vừa chết/không phải lượt → chỉ một request được xử lý theo thứ tự khoá; request còn lại bị từ chối.
- [ ] Timeout cùng lúc với action → server xử lý tuần tự theo khoá bản ghi, một kết quả duy nhất, `so_luot` tăng đúng 1 cho mỗi mutation.
- [ ] Fault injection: không tồn tại trạng thái đã commit mà "damage đã trừ nhưng MP chưa trừ", "actor chết còn trong ATB", "passive đã log nhưng effect chưa commit", hoặc "đội đã thắng nhưng actor đối phương vẫn được hành động".

### P0 — Online Engine Host (mới ở v1.8.1, đóng mơ hồ hosting Shared Combat Engine)
- [ ] Xác nhận bằng thiết kế/triển khai: Shared Combat Engine (toàn bộ logic ở mục 1.5) chạy ở tầng application/server runtime (Edge Function/backend service) — không tồn tại bất kỳ PL/pgSQL function nào chứa logic tính ATB/target/damage/effect/passive/victory.
- [ ] Mọi hàm SQL/RPC chạy trong PostgreSQL (nếu có) chỉ thực hiện: khoá bản ghi, ghi atomic, transaction boundary — kiểm tra bằng cách đọc định nghĩa hàm đó không chứa nhánh rẽ theo effect/skill/target nào.
- [ ] Cùng một bộ input (state + hành động) chạy qua Local Runtime và qua Online Runtime cho **kết quả giống hệt nhau** — xác nhận cả hai runtime gọi chung một implementation Shared Combat Engine, không phải hai bản logic khác nhau.
- [ ] Với Online Runtime: 1 lượt đánh vẫn tương ứng đúng 1 transaction database (mục 0.2, 1.5.3 bước 0/14) — transaction bao quanh bước **ghi kết quả engine đã tính xong**, không bao quanh việc "tính toán trong SQL".

### P0 — Randomness/Determinism (mới ở v1.9.0) [SPEC-VERIFIABLE: contract; IMPLEMENTATION-VERIFIABLE: kết quả thực tế]
- [ ] `rng_seed` được sinh đúng 1 lần tại `bat_dau_tran`, không đổi trong suốt trận; `rng_state` chỉ advance khi `NGAU_NHIEN_N_DICH` thực sự được dùng (không advance ở các lượt không dùng effect này).
- [ ] Chạy cùng 1 fixture (content snapshot + actors + `rng_seed` + chuỗi hành động cố định) qua Local Runtime và Online Runtime → state cuối và toàn bộ `nhat_ky_luot_danh` giống hệt nhau, đặc biệt actor được chọn ở mỗi lần `NGAU_NHIEN_N_DICH`. **[IMPLEMENTATION-VERIFIABLE]**
- [ ] Rà mã nguồn xác nhận không có lời gọi `Math.random()`/`crypto.getRandomValues()` nào trong Shared Combat Engine. **[IMPLEMENTATION-VERIFIABLE]**
- [ ] `nhat_ky_luot_danh` ghi đủ `rng_state` trước mỗi lần gọi PRNG — đủ để replay một trận từ log mà không cần chạy lại toàn bộ combat.

### P0 — Anti-farming invariant (mới ở v2.0.1)
- [ ] Thắng cùng một màn Đi ải 10 lần liên tiếp bằng "Đấu lại màn này" → toàn bộ dữ liệu bền vững (`tien_do_di_ai`, mọi bản ghi local) sau lần thắng thứ 10 **giống hệt** sau lần thắng thứ 1. **[IMPLEMENTATION-VERIFIABLE; contract INV-PVE-1 là SPEC-VERIFIABLE]**
- [ ] Bấm "Đấu lại" ở PvE Đối kháng 10 lần → không có bản ghi bền vững mới nào ngoài log trận (nếu có lưu); không có trường tiền tệ/điểm/vật phẩm nào tồn tại trong schema PvE local. **[IMPLEMENTATION-VERIFIABLE]**
- [ ] Rà schema (mục 0.7): không tồn tại cột/bảng tiền tệ, điểm thưởng hay unlock-theo-thưởng nào cho `nguoi_choi_local`/`nhan_vat`/`tien_do_di_ai`. **[SPEC-VERIFIABLE]**

### P0 — Content Bundle (mới ở v1.9.0)
- [ ] Publish nội dung mới ở Dev Mode → `phien_ban_content` tăng đúng 1, `content_hash` khớp SHA-256 của nội dung publish.
- [ ] Client tải bundle với hash bị hỏng cố ý (giả lập lỗi mạng giữa chừng) → huỷ bản tải, giữ nguyên bundle cũ, không cache bản lỗi.
- [ ] Bundle mới hơn đến trong lúc đang chơi 1 trận PvE → trận đang chạy vẫn dùng snapshot cũ tới hết trận; chỉ trận **mới** dùng bundle mới.

### P0 — Realtime canonical-state + gap-resync (mới ở v1.8.1)
- [ ] Mỗi event Realtime nhận được chứa đầy đủ canonical `trang_thai_chien_dau` tương ứng đúng `so_luot` của event đó (không phải một delta/diff thiếu thông tin).
- [ ] Event có `so_luot` ≤ version hiện tại của client → bị bỏ qua (giữ nguyên hành vi đã có).
- [ ] Dàn dựng tình huống client nhận event nhảy cóc version (ví dụ đang ở `so_luot=10`, event kế tiếp nhận được là `so_luot=13`) → client **không** tự áp trực tiếp state của event `13` mà không xác minh, và **không** nội suy state của `11`/`12` — client phải gọi lại canonical snapshot từ server rồi mới tiếp tục.
- [ ] Sau khi resync bằng canonical snapshot, client tiếp tục nhận đúng các event kế tiếp mà không lặp lại việc resync không cần thiết (không resync liên tục nếu version đến tuần tự bình thường).
- [ ] Reconnect (mất mạng giữa trận) luôn khôi phục đúng canonical state hiện tại kể cả khi có nhiều event đã phát ra trong lúc client offline.

### P0 — AI / Dev Sandbox
- [ ] AI deterministic: cùng state → cùng hành động; hành động AI đi qua đúng validate target như người chơi.
- [ ] Sandbox (mọi tổ hợp 1–3 vs 1–3) gọi đúng primitive `thuc_hien_luot_danh` production, không ghi `tien_do_di_ai`, không phát Realtime vào phòng thật, không đọc/sửa `tran_dau` thật.

### P1
- [ ] AI theo archetype: AGGRESSIVE ưu tiên kết liễu; CONTROL ưu tiên CC target nguy hiểm chưa bị CC và `khang_cc = 0`; DEFENSIVE ưu tiên cứu đồng đội HP ≤ 35% khi có skill hồi phục/khiên hợp lệ; không dùng thông tin ẩn của đối phương.
- [ ] `lua_chon_hop_le` cho phép UI disable skill/target không hợp lệ ngay từ đầu; người chơi không bấm skill rồi mới báo "Invalid target" (trừ khi state đổi ngay trước commit).
- [ ] `lay_tong_ket_tran` trả đủ nội dung mục 1.5.6; truy vấn metric mục 0.14 chạy được trên trận thật và trận Sandbox.
- [ ] UI trận 3v3 hiển thị HP/MP/status/cooldown/ATB/Class/Passive/actor đang đi/target/đội rõ ràng, không quá chật.

---

### P0 — Triệu Hồi Khởi Đầu / Hero preset (mới ở v2.4.0)
- [ ] Người chơi local mới có `da_nhan_trieu_hoi_khoi_dau=false`.
- [ ] Nhận Triệu Hồi Khởi Đầu → đúng 10 Hero khác nhau, chỉ thuộc pool 20 Hero B→SS.
- [ ] 10 lượt có ít nhất 1 Hero `S/SS` và ít nhất 1 Hero `A/S/SS`.
- [ ] Sau khi commit thành công, `da_nhan_trieu_hoi_khoi_dau=true`; reload/crash/retry không cấp lần hai.
- [ ] Gọi API nhận gói hai lần đồng thời → chỉ một lần thành công; không tạo Hero trùng do race.
- [ ] Không có nút reroll/banner/mua lượt/đổi duplicate trong MVP.
- [ ] Mỗi Hero preset có `la_hero_preset=true`, tier đúng B/A/S/SS và tối thiểu 6 skill + 1 passive.
- [ ] Mở Hero bằng Hương Hỏa dùng direct-choice, trừ đúng giá B=15/A=30/S=50/SS=80, không random.
- [ ] Hero đã sở hữu không thể mở lần hai và không bị trừ Hương Hỏa.
- [ ] Sau khi mở Hero bằng Hương Hỏa, `so_du` giảm đúng số tiền; Hương Hỏa không được cộng thêm ngoài first-clear.
- [ ] Bách Thần Điện vẫn giữ giá Linh Thần 300 và không có Linh Thần SSS trong gacha.

### P0 — Hương Hỏa / Tier / Linh Thần (mới ở v2.1.0)
- [ ] First-clear màn X lần đầu (thắng) → `tien_do_di_ai.da_hoan_thanh: false→true`, `vi_huong_hoa.so_du += man_choi.huong_hoa_first_clear`, `tran_dau.ket_qua_tien_trinh.first_clear = true`.
- [ ] Thắng lại màn X lần 2 → `da_hoan_thanh` đã `true`, `so_du` **không đổi**, `ket_qua_tien_trinh.huong_hoa_nhan = 0`.
- [ ] "Đấu lại màn này" 10 lần liên tiếp sau first-clear → `so_du` sau lần 10 **giống hệt** sau lần 1.
- [ ] "Đấu lại" (PvE Đối kháng) 10 lần → `vi_huong_hoa` không đổi ở bất kỳ lần nào (không có `man_choi_id` để gắn thưởng).
- [ ] Khởi động lại app ngay sau khi first-clear COMMIT → mở lại vẫn thấy `so_du` đã cộng, không cấp lại nếu chơi tiếp.
- [ ] Thắng hết cả 3 màn trong seed MVP (mỗi màn đúng 1 lần first-clear) → tổng `so_du` cộng dồn đúng 300 (bảng 0.8.6.F); nếu không tiêu cho Hero thì đủ mở **đúng 1** Linh Thần.
- [ ] Không có hành động nào trong game (Đấu lại/replay/PvE Đối kháng) tạo thêm Hương Hỏa; nếu người chơi tiêu Hương Hỏa cho Hero thì phải giữ đúng số dư còn lại và UI phải nói rõ họ đang trì hoãn mốc 300 để thỉnh Linh Thần.
- [ ] `mo_khoa_linh_than(class_id)` khi `so_du ≥ chi_phi_linh_than` → trừ đúng số, tạo `nhan_vat` mới `tier=SSS`, thêm `class_id` vào `linh_than_da_mo`, tất cả trong 1 giao dịch.
- [ ] `mo_khoa_linh_than` khi `so_du < chi_phi_linh_than` → từ chối toàn bộ, không trừ một phần, không tạo `nhan_vat` rác.
- [ ] `mo_khoa_linh_than` gọi 2 lần liên tiếp (double-click/duplicate request) cho cùng `class_id` khi chỉ đủ tiền cho 1 lần → đúng 1 lần thành công, lần kia bị từ chối (kiểm tra lại `so_du` ngay trong transaction, không đọc-rồi-ghi tách rời).
- [ ] Tạo nhân vật `THUONG` nhiều lần (≥ 50 lần trong test) → phân phối `tier` xấp xỉ đúng `trong_so_tier_tao_moi` (60/30/10), không bao giờ ra `SSS`.
- [ ] Bước 1 luồng tạo nhân vật không hiển thị bất kỳ Class `LINH_THAN` nào.
- [ ] Sửa/xoá nhân vật `LINH_THAN`: có respec + đổi skill, **không có** nút xoá, **không** đổi được ngoại hình/tên.
- [ ] Giả lập crash ngay sau khi transaction first-clear COMMIT nhưng trước khi client nhận phản hồi → mở lại ứng dụng, gọi lại đúng request (retry) → không cấp thêm lần 2 (đọc lại `da_hoan_thanh` đã `true`).
- [ ] Schema `nhan_vat.tier`/`doi_ai.tier` chấp nhận đủ 6 giá trị `C,B,A,S,SS,SSS`; `CHECK` từ chối `C` ở mọi `nhan_vat`; `SS` chỉ hợp lệ khi `class.phan_loai=THUONG` và `class.la_hero_preset=true`.
- [ ] Seed 2 `man_choi` với `doi_ai.tier` khác nhau (`C` ở màn đầu, `SS` ở màn cuối) → `he_so_tier_ap_dung` trong snapshot đúng theo `cau_hinh_he_thong.he_so_tier`, actor AI tier `SS` có HP/ATK/DEF nền cao hơn rõ rệt actor AI tier `C` cùng Class.
- [ ] Trận ở phòng `CAN_BANG` có 1 actor `tier=SSS`: `he_so_tier_ap_dung=1.00` (không có bonus Layer 1) nhưng Nội tại và toàn bộ skill của Class Linh Thần đó vẫn kích hoạt/áp dụng bình thường trong combat log — xác nhận Layer 2 không bị tắt theo `CAN_BANG`.
- [ ] **(mới v2.3.0)** Dev Mode cố lưu/publish một Class `phan_loai=LINH_THAN` mà không có bất kỳ `ky_nang.dac_trung_rieng=true` hay `noi_tai_class.dac_trung_rieng=true` nào → bị từ chối (hard block), không publish được.
- [ ] **(mới v2.3.0)** Dev Mode lưu một Class `LINH_THAN` có đúng 1 skill `dac_trung_rieng=true` → cho phép lưu; cả 4 Linh Thần seed trong MVP (Sơn Tinh, Thạch Sanh, Thánh Gióng, Chử Đồng Tử) đều có ít nhất 1 cờ `dac_trung_rieng=true` — rà schema seed xác nhận, không chỉ đọc mô tả.
- [ ] **(mới v2.3.0)** `cau_hinh_he_thong.he_so_tier` khớp đúng bảng mới (`C=0.94, B=1.00, A=1.04, S=1.08, SS=1.13, SSS=1.22`); tính `chi_so_nen_hieu_dung` cho mỗi tier trên cùng 1 Class mẫu → kết quả đúng công thức `ROUND(chi_so_nen × he_so_tier)`, bước nhảy `SS→SSS` (+9 điểm %) lớn hơn mọi bước nhảy khác (+4 đến +6) nhưng không vượt quá 2 lần bước nhảy liền trước.

### P0 — PvP bản khai nhân vật & luật Tier phòng (mới ở v2.1.0)
- [ ] Gửi bản khai với `class_id` không tồn tại/không `HOAT_DONG` → từ chối cả đội hình.
- [ ] Gửi bản khai `tier=SSS` nhưng `class.phan_loai=THUONG` (hoặc ngược lại) → từ chối.
- [ ] Gửi bản khai với `ky_nang_trang_bi` chứa id thuộc Class khác → từ chối.
- [ ] Gửi bản khai `diem_*` tổng ≠ 5 hoặc có giá trị > 2 → từ chối.
- [ ] Gửi bản khai `tier=SSS` kèm `ten_hien_thi`/`ngoai_hinh` tự chọn khác với `class.ten_co_dinh`/`ngoai_hinh_co_dinh` → server ghi đè đúng bằng dữ liệu cố định của Class, đối thủ luôn thấy đúng ngoại hình/tên chính chủ.
- [ ] Đội hình có > `so_linh_than_toi_da_moi_doi` bản khai `tier=SSS` → từ chối toàn bộ đội hình.
- [ ] Trận tạo ở phòng `che_do_tier=CAN_BANG` với 1 actor `tier=S` và 1 actor `tier=B` → cả hai có `he_so_tier_ap_dung=1.00` trong snapshot, chỉ số cuối chỉ khác nhau do Stat Allocation/skill, không do tier.
- [ ] Trận tạo ở phòng `che_do_tier=TU_DO` → `he_so_tier_ap_dung` đúng theo `cau_hinh_he_thong.he_so_tier[tier]` của từng actor.
- [ ] Actor `tier=SSS` trong bất kỳ trận nào (PvE lẫn PvP) đều đi qua đúng ATB/MP/cooldown/CC/target/effect/death như actor thường — không có nhánh code riêng (rà theo mã nguồn, không chỉ theo spec).


## 0.16 Tiêu chí nghiệm thu — Offline Architecture (OFF-01 → OFF-10, mới ở Final Patch Kiến trúc)

- [ ] **OFF-01**: Sau khi app đã tải/cache Content Bundle đầy đủ → tắt Internet → mở app → vào PvE → tạo/chọn nhân vật → chọn đội hình 1–3 → bắt đầu trận → thành công, không có lỗi mạng/timeout nào chặn luồng.
- [ ] **OFF-02**: Mất Internet **giữa** một trận PvE đang diễn ra → combat tiếp tục xử lý lượt bình thường (Local Runtime không phụ thuộc kết nối đã mất).
- [ ] **OFF-03**: AI trong PvE (Local Runtime) ra quyết định và hành động bình thường khi offline — không có bước nào của thuật toán AI (mục 1.5.4) gọi ra ngoài thiết bị.
- [ ] **OFF-04**: Lưu tiến trình PvE (`tien_do_di_ai`, save `tran_dau` đang dở nếu có) hoạt động khi offline; đóng app rồi mở lại (vẫn offline) đọc lại đúng tiến trình đã lưu.
- [ ] **OFF-05**: Dev Sandbox Test (mục 3.8) chạy mô phỏng combat khi offline, miễn là nội dung cần test (Class/Skill/Passive đang soạn hoặc đã cache) đã có sẵn trên thiết bị — không cần gọi lại cổng xác thực Dev Mode (3.1) cho mỗi lần mô phỏng.
- [ ] **OFF-06**: Khi offline và người chơi chọn PvP → ứng dụng không crash, hiển thị rõ ràng "PvP cần kết nối Internet", không hiển thị màn hình PvP treo vô thời hạn hay lỗi mơ hồ.
- [ ] **OFF-07**: Bắt (capture) toàn bộ network request trong một trận PvE đầy đủ (từ `bat_dau_tran` tới `KET_THUC`) → xác nhận **không có request nào** tới Supabase/API bắt buộc để trận hoàn thành (ngoại trừ request tải Content Bundle diễn ra **trước** khi trận bắt đầu, nếu có).
- [ ] **OFF-08**: Với cùng seed random + cùng snapshot input + cùng chuỗi hành động, Local Runtime và Online Runtime cho ra **cùng kết quả combat** (cùng HP/MP/effect cuối, cùng log các bước) trong phạm vi Shared Combat Engine đã định nghĩa deterministic (mục 1.5.0 và các mục liên quan) — xác nhận bằng cách chạy song song 1 kịch bản cố định qua cả hai runtime và so log.
- [ ] **OFF-09**: Rà mã nguồn/thiết kế xác nhận **chỉ có một** cài đặt logic combat (Shared Combat Engine) được cả Local Runtime và Online Runtime gọi tới — không tồn tại một bản sao/nhánh logic combat thứ hai chỉ dùng cho PvE hoặc chỉ dùng cho PvP.
- [ ] **OFF-10**: Sau khi cache/cài đặt xong, xoá hoàn toàn quyền truy cập mạng của thiết bị (airplane mode + tắt wifi) → mở lại app từ đầu (cold start, không phải resume) → PvE vẫn chơi được đầy đủ từ màn Menu chính tới hết 1 trận.

---

# PHẦN 1 — NỀN TẢNG & PvE

> Phụ thuộc Phần 0. Không bao gồm PvP (Phần 2) và Chế độ Dành cho nhà phát triển (Phần 3).
>
> **Runtime: Local Runtime (mục 0.2).** Toàn bộ Phần 1 chạy Shared Combat Engine in-process trên thiết bị người chơi, đọc dữ liệu từ Content Bundle đã cache (mục 0.6a), lưu trạng thái/tiến độ vào local storage theo `nguoi_choi_local_id` (mục 0.7.0). **Không có bước nào trong Phần 1 bắt buộc gọi server** — sau khi Content Bundle đã tải lần đầu, toàn bộ Phần 1 hoạt động khi mất Internet.

## 1.1 Màn hình Menu chính

Màn độc lập, route riêng, không chứa bất kỳ logic chọn nhân vật nào.

| Thành phần | Hành vi |
|---|---|
| Nút "Chơi ngay" | Mở rộng hiển thị 2 nhóm: PvE (kích hoạt ở Phần 1 này) và PvP (hiển thị nhưng khoá/"Sắp ra mắt" — kích hoạt đầy đủ ở Phần 2) |
| Nút "Thiết lập đội hình" | Điều hướng sang route Kho nhân vật (mục 2) |
| Nút "Thoát" | Thoát ứng dụng/đóng phiên |
| Liên kết "Dành cho nhà phát triển" | Hiển thị nhỏ, góc màn hình; ở Phần 1 **hiển thị nhưng chức năng bị khoá cho đến khi Phần 3 được triển khai** (thứ tự build theo 3 prompt, mục 4.5) — không phải khoảng trống đặc tả |

**PvE — 2 lựa chọn dưới nút Chơi ngay:**
- **Đối kháng**: vào thẳng màn Chọn đội hình ra trận (1–3 nhân vật, mục 1.4), sau đó đấu 1 trận với đội AI cố định theo seed (mục 1.6.1).
- **Đi ải**: vào màn Chọn màn chơi (danh sách `man_choi` theo `thu_tu`, đánh dấu màn nào đã hoàn thành), sau đó Chọn đội hình ra trận, rồi vào trận.
- **Điều kiện v1.8.0 (patch: hạ từ ≥3 xuống ≥1):** người chơi chỉ cần có ≥ 1 nhân vật; nếu chưa có nhân vật nào, "Chơi ngay" hiển thị lối tắt tới "Tạo nhân vật mới" thay vì mở màn chọn đội hình. Có 1 hoặc 2 nhân vật vẫn vào trận được bình thường (đội hình ít hơn 3).

## 1.2 Màn hình Kho nhân vật ("Thiết lập đội hình")

Route riêng, chỉ dùng để quản lý, không dùng để vào trận.

| Thành phần | Hành vi |
|---|---|
| Danh sách nhân vật | Hiển thị tất cả `nhan_vat` của `nguoi_choi_local`: ảnh đại diện (render từ ngoại hình), tên, class, và huy hiệu **Tier** (B/A/S bằng số sao; SSS bằng khung vàng riêng + nhãn "Linh Thần") trên mỗi thẻ |
| Chọn 1 nhân vật `THUONG` | Mở màn sửa: đổi ngoại hình, đổi skill trang bị, **phân bổ lại 5 điểm** (miễn phí, mục 0.8.4.E), **Xoá nhân vật** (xác nhận 2 bước); không đổi được class/tier sau khi tạo. Hiển thị Class, Nội tại, chỉ số Base/Bonus/Final |
| Chọn 1 nhân vật `LINH_THAN` (SSS) | Mở màn sửa **rút gọn**: chỉ đổi skill trang bị và phân bổ lại 5 điểm — không đổi ngoại hình/tên (cố định), **không có nút Xoá** (mục 0.7.10) |
| Nút "Tạo nhân vật mới" | Mở luồng tạo nhân vật 5 bước + xem lại (mục 1.3) |

## 1.3 Luồng tạo nhân vật (5 bước + xem lại)

Một panel "Build" cố định hiển thị xuyên suốt: Class, Nội tại, chỉ số Base/Bonus/Final, skill đã chọn, ngoại hình, tên. Người chơi có thể quay lại bước trước bất kỳ lúc nào; chưa có gì được ghi vào server cho tới khi xác nhận.

**Bước 1 — Chọn Class**: hiển thị danh sách `class` có `trang_thai = HOAT_DONG` **và `phan_loai = THUONG`** (Linh Thần không xuất hiện ở đây — chỉ mở qua Bách Thần Điện, mục 1.4b), với 6 chỉ số nền (HP/ATK/DEF/SPD/MP/MP hồi mỗi lượt), **Nội tại Class** (tên + mô tả) và mô tả bản sắc để người chơi so sánh.

**Bước 2 — Đặt tên nhân vật**: nhập `ten_nhan_vat` bắt buộc. Trim khoảng trắng đầu/cuối; độ dài 1–24 ký tự Unicode; không chấp nhận chuỗi chỉ gồm khoảng trắng hoặc ký tự điều khiển. Tên trùng với nhân vật khác **được phép** ở v1.7.0+ để tránh biến việc đặt tên thành rào cản không cần thiết. Hiển thị preview tên ngay trên thẻ nhân vật.

**Bước 3 — Phân bổ 5 điểm (Stat Allocation, mới v1.8.0)**: hiển thị "Điểm còn lại: N" và 6 hàng stat (HP, ATK, DEF, SPD, MP, MP Regen), mỗi hàng 0–2 điểm với nút +/−. Mỗi lần thay đổi hiển thị preview `Base → Final (+Bonus)`, ví dụ `HP 700 → 784`, `SPD 100 → 106`. Nút + của stat đã đủ 2 điểm và của mọi stat khi hết điểm bị vô hiệu; có nút **"Đặt lại 5 điểm"** và nút **"Dùng gợi ý cho người mới"** (áp `class.goi_y_phan_bo` nếu Dev Mode đã đặt, vẫn chỉnh tay tiếp được — mục 0.5a); không cho sang bước sau khi tổng ≠ 5. Người chơi không phải nhớ hay nhìn thấy công thức quy đổi. server trả về (client chỉ hiển thị); server tính lại và validate khi lưu (mục 0.8.4).

**Bước 4 — Tuỳ chỉnh ngoại hình**: theo đúng thứ tự sau, mỗi mục chọn 1 trong các `ngoai_hinh_asset` khả dụng (lọc theo `gioi_tinh_tuong_thich`):
1. Giới tính (Nam/Nữ) — chọn trước, quyết định danh sách khả dụng ở các bước sau
2. Màu da (chọn từ `mau_da_preset`)
3. Tóc
4. Nét mặt
5. Áo
6. Quần
7. Trang sức (tuỳ chọn, có thể bỏ trống)

Hiển thị xem trước (preview) nhân vật cập nhật theo thời gian thực khi người chơi đổi từng lựa chọn.

**Bước 5 — Trang bị kỹ năng**: hiển thị toàn bộ `ky_nang` thuộc `class_id` đã chọn ở bước 1 (`trang_thai = HOAT_DONG`). Người chơi chọn **tối thiểu 1, tối đa 4** để đưa vào `ky_nang_trang_bi`; nút **"Dùng gợi ý"** chọn sẵn `class.goi_y_ky_nang` nếu có.

**Xem lại & xác nhận**: hiển thị Class, Nội tại, Base/Bonus/Final Stats, 4 skill, ngoại hình, tên. Nút "Lưu" bị vô hiệu nếu chưa có skill nào, chọn quá 4 skill hoặc tổng điểm ≠ 5. Với **nhân vật tự tạo**, sau khi lưu thành công, roll `tier ∈ {B,A,S}` (mục 0.8.6.A) và hiển thị **ngay trên màn xác nhận** bằng một hiệu ứng ngắn (ví dụ mở huy hiệu tier) trước khi quay về Kho nhân vật — đây là phần thưởng-tạo-nhân-vật, không phải gacha trả phí, không lặp lại được cho cùng một nhân vật. Nếu lưu thất bại ở server, không tạo bản ghi một phần và không roll tier.

## 1.4 Màn hình Chọn đội hình ra trận

Xuất hiện sau khi đã chọn chế độ (PvE Đối kháng, PvE Đi ải, PvP Đối kháng), trước Màn trận đấu. Hiển thị nhân vật của người chơi (Class, Nội tại, chỉ số cuối, huy hiệu Tier — mục 1.2) nhưng **không có** nút sửa/tạo mới ở đây — người chơi chọn **1 đến 3 nhân vật khác nhau** (không trùng `nhan_vat_id`) vào các vị trí (slot 1→độ dài đội hình đã chọn) rồi xác nhận. Chọn 1 nhân vật hoặc 2 nhân vật đều hợp lệ để "Vào trận"; chỉ 0 nhân vật mới bị từ chối.
- **Giới hạn Linh Thần (mới v2.1.0):** tối đa `so_linh_than_toi_da_moi_doi` (mặc định 1, mục 0.7.13b) nhân vật `tier = SSS` mỗi đội hình; chọn thêm 1 Linh Thần nữa sẽ khiến ô đó không bấm được nữa (disabled), kèm chú thích ngắn. PvE: hệ số tier luôn áp dụng đầy đủ. PvP: nếu phòng `che_do_tier = CAN_BANG`, UI vẫn cho chọn Linh Thần bình thường (đây là lựa chọn thẩm mỹ hợp lệ) nhưng hiển thị rõ "Hệ số Tier bị vô hiệu ở phòng này".
- Slot không mang vai trò chiến thuật; thứ tự chỉ dùng để đặt tên actor (A1–A3 / B1–B3) và làm tie-break ATB (mục 1.5.0).
- Cho phép trùng Class; không trùng nhân vật; không có role bắt buộc.
- Nút xác nhận bị vô hiệu nếu đội hình đang chọn có 0 nhân vật hoặc vượt quá 3 (nút chỉ bật khi 1, 2 hoặc 3 nhân vật đã chọn — khớp mục 0.6/0.15, không còn bắt buộc đúng 3 như bản trước). Server validate lại khi xác nhận/`bat_dau_tran`: 1–3, phân biệt, thuộc người gọi, `diem_*` hợp lệ (tổng 5, hoặc 0 với nhân vật legacy).
- Cảnh báo mềm (không chặn) nếu có nhân vật chưa phân bổ điểm.
- PvP: đối thủ không thấy đội hình của bạn cho tới khi trận bắt đầu.

---

## 1.4a Màn hình Kết quả trận (mới ở v1.9.1 — đóng gap "dead-end sau trận" từ Player Experience Audit)

> **Vấn đề tìm thấy khi audit trải nghiệm người chơi:** trước v1.9.1, đặc tả có sẵn dữ liệu tổng kết (`lay_tong_ket_tran`, mục 1.5.6) nhưng **không có bất kỳ mô tả UI nào** về việc người chơi làm gì tiếp theo sau khi xem kết quả — rủi ro thực sự là người chơi thắng/thua rồi rơi vào màn hình cụt (phải tự bấm Back nhiều lần để chơi lại). Đây là **Must Fix**: chi phí thấp (thuần UI + gọi lại đúng 2 primitive đã có sẵn, `bat_dau_tran` và điều hướng màn hình), nhưng ảnh hưởng trực tiếp tới lý do người chơi bấm "chơi trận thứ hai".

Sau khi `tran_dau.trang_thai = KET_THUC` (nhận qua Realtime với PvP, hoặc trực tiếp sau lượt cuối với Local Runtime PvE), hiển thị kết quả từ `lay_tong_ket_tran` (mục 1.5.6: Thắng/Thua/Hòa, số lượt, sát thương/hồi máu/khiên/CC theo từng actor, danh sách skill đã dùng) kèm đúng bộ nút hành động sau, tùy ngữ cảnh:

| Ngữ cảnh | Nút hiển thị | Hành động |
|---|---|---|
| PvE Đối kháng (đấu tự do, không thuộc `man_choi`) | **Đấu lại** · Đổi đội hình · Về Menu | "Đấu lại" gọi lại `bat_dau_tran` với **đúng đội hình vừa dùng** (không bắt người chơi chọn lại từ đầu) đấu với đội AI đối kháng mới sinh theo cùng luật mục 1.6.1. Không tạo Hương Hỏa (mục 0.8.6.C) |
| PvE Đi ải — **Thắng** | **Màn tiếp theo** (nếu còn màn chưa mở khoá) · Đấu lại màn này · Đổi đội hình · Về Menu | "Màn tiếp theo" nhảy thẳng vào `bat_dau_tran` của màn kế, bỏ qua màn hình chọn màn nếu chỉ có đúng 1 màn kế hợp lệ theo tiến độ (`tien_do_di_ai`). Đọc `tran_dau.ket_qua_tien_trinh` (đã tính sẵn, mục 0.8.6.D) để hiển thị banner: nếu `huong_hoa_nhan > 0` → "+N Hương Hỏa (First Clear)"; nếu `= 0` (màn này đã first-clear từ trước) → không hiện banner, không giả vờ có thưởng. Nếu sau banner `vi_huong_hoa.so_du ≥ chi_phi_linh_than` và chưa mở Linh Thần nào → thêm dòng gợi ý "Bách Thần Điện đang chờ bạn". Nếu đã thắng hết mọi màn trong MVP và `so_du < chi_phi_linh_than` (ví dụ đã mở 1 Linh Thần, dư 0) → hiển thị đúng câu ở mục 12 audit gốc: "Bạn đã hoàn thành toàn bộ nội dung hiện có — nguồn Hương Hỏa mới sẽ đến cùng nội dung mới" — không tạo cảm giác bug |
| PvE Đi ải — **Thua** | **Đấu lại màn này** · Đổi đội hình · Về Menu | Không có "Màn tiếp theo" vì chưa qua được màn hiện tại |
| PvP Đối kháng (bất kỳ kết quả) | **Tìm trận mới** (tạo/vào phòng khác) · Đổi đội hình · Về Menu | Không có "Đấu lại" với đúng đối thủ cũ (không có khái niệm rematch-với-người-cũ ở v1.8.x — cần cả hai người tạo phòng mới, đủ đơn giản cho v1, không cần thêm cơ chế mời lại) |

**Ràng buộc bắt buộc:** "Đấu lại"/"Màn tiếp theo" giữ nguyên đội hình (danh sách `nhan_vat_id`) vừa dùng làm mặc định — người chơi không phải chọn lại 1–3 nhân vật từ đầu mỗi lần, nhưng vẫn có nút "Đổi đội hình" quay lại màn 1.4 nếu muốn. Đây thuần là UX/data (nhớ lựa chọn gần nhất trong state màn hình, không cần lưu server) — không đổi combat engine, không đổi schema, không đổi acceptance test kỹ thuật đã có.

**`INV-PVE-1`** đã được chuyển sang mục 0.8.6.E (First Clear Reward Invariant) — giữ nguyên tinh thần "không có nút farm": chỉ 1 cờ idempotent (`da_hoan_thanh`) cho mỗi (người chơi, màn).

Không có "Key Moment"/highlight thuật toán ở v1.8.x (giữ ở Future Roadmap, mục 4.7) — bảng tổng kết theo actor ở `lay_tong_ket_tran` đã đủ cho người chơi tự nhận ra ai đóng góp nhiều nhất mà không cần engine tự tính "khoảnh khắc hay nhất".

---

## 1.4b Màn hình Triệu Hồi Khởi Đầu & Kho Hero

### 1.4b.1 Triệu Hồi Khởi Đầu

- Chỉ hiện nếu `nguoi_choi_local.da_nhan_trieu_hoi_khoi_dau = false`.
- Nút lớn: **"Triệu Hồi Khởi Đầu — 10 lượt miễn phí"**.
- Màn preview nói rõ: "10 Hero khác nhau · chắc chắn có ít nhất 1 S+ · không mất Hương Hỏa".
- Bấm xác nhận → chạy gacha một lần ở tầng local → tạo toàn bộ Hero nhận được → đánh dấu `da_nhan_trieu_hoi_khoi_dau=true` → hiển thị màn kết quả 10 thẻ.
- Không cho đóng giữa chừng rồi nhận lại. Nếu app crash, lần mở lại phải đọc trạng thái đã commit và chỉ hiển thị kết quả đã lưu.
- Sau gói đầu tiên, nút biến mất; không có banner/gacha khác trong MVP.

### 1.4b.2 Kho Hero — mở trực tiếp bằng Hương Hỏa

Route riêng, có thể đặt cạnh Bách Thần Điện. Hiển thị số dư Hương Hỏa và 20 Hero preset.
- Thẻ Hero đã sở hữu: sáng, có nút "Xem trong Kho nhân vật".
- Hero chưa sở hữu và đủ Hương Hỏa: nút **"Mở Hero — N Hương Hỏa"**.
- Hero chưa đủ Hương Hỏa: hiển thị giá + tiến độ số dư, không có nút thao tác.
- Không có nút "Quay" trong màn này. Đây là **direct choice**.
- UI phải hiển thị một dòng cảnh báo khi người chơi chuẩn bị tiêu Hương Hỏa: "Hương Hỏa này cũng dùng để thỉnh Linh Thần (300)."

## 1.4b Màn hình Bách Thần Điện (mới ở v2.1.0)

Route riêng, vào từ Menu chính (mục 0.5), không thuộc luồng vào trận.

- Hiển thị số dư hiện tại (`vi_huong_hoa.so_du`) nổi bật ở đầu màn.
- Lưới thẻ, mỗi thẻ 1 Class `phan_loai = LINH_THAN` đang `HOAT_DONG`:
  - **Đã mở** (`class_id ∈ vi_huong_hoa.linh_than_da_mo`): hiển thị đầy đủ ngoại hình/tên/skill, nút "Xem trong Kho nhân vật" thay vì nút mở.
  - **Chưa mở, đủ Hương Hỏa** (`so_du ≥ chi_phi_linh_than`): hiển thị ngoại hình + tên + preview Nội tại/skill (không mờ), nút **"Thỉnh [Tên Linh Thần]"** kèm chi phí.
  - **Chưa mở, chưa đủ Hương Hỏa**: hiển thị mờ (silhouette + tên), thanh tiến độ `so_du / chi_phi_linh_than`, không có nút (không phải nút disabled gây khó hiểu — ẩn hẳn nút, chỉ hiện thanh tiến độ).
- Bấm "Thỉnh": hộp xác nhận 1 bước ("Dùng 300 Hương Hỏa để thỉnh Sơn Tinh?") → gọi RPC `mo_khoa_linh_than(class_id)` (mục 0.8.6.B) → thành công tạo `nhan_vat` mới, trừ ví, chuyển thẳng sang màn sửa nhân vật rút gọn (mục 1.2) để chọn skill/phân bổ điểm lần đầu cho Linh Thần vừa thỉnh.
- **Không có**: danh sách xoay vòng, gói mua bằng tiền thật, số lượng giới hạn theo thời gian, nút "Roll ngẫu nhiên" — đây là màn **chọn trực tiếp**, không phải gacha (mục 0.8.6.B).
- Nếu tất cả Linh Thần đã seed đều đã mở: hiển thị thông báo "Bạn đã thỉnh đủ mọi Linh Thần hiện có" thay cho lưới.

---


## 1.5 Quy ước trạng thái và timing combat

Các quy ước dưới đây là **định nghĩa chính thức của Shared Combat Engine** (mục 0.2) — dùng chung cho PvE (Local Runtime), PvP (Online Runtime) và AI, không có phiên bản riêng cho từng runtime. Toàn bộ mô tả "server" trong mục 1.5–1.5.5 mô tả **hành vi authoritative của engine**; với PvP, authoritative nghĩa là server; với PvE, authoritative nghĩa là chính engine chạy local trên thiết bị (không có server nào khác để phân biệt):

1. **Nguồn trạng thái chuẩn:** `tran_dau.trang_thai_chien_dau`. Client chỉ hiển thị trạng thái server trả về; `nhat_ky_luot_danh` chỉ là lịch sử.
2. Snapshot mỗi actor tối thiểu gồm: `actor_id`, `doi`, `vi_tri`, `dieu_khien`, `hp_hien_tai`, `hp_toi_da`, `mp_hien_tai`, `mp_toi_da`, `shield_hien_tai`, `buff`, `debuff`, `dot`, `hot`, `khang_cc`, `thanh_tich_luy` (gauge ATB), cooldown từng skill; toàn trận có danh sách `actors[]` (tối đa 6), actor nào đang đi, số lượt và `chuoi_luot`. Xem cấu trúc đầy đủ ở mục 1.5.1.
3. **Một lượt = một lần dùng skill hoặc BỎ_LƯỢT, luôn do đúng 1 actor thực hiện** (actor được ATB chọn ở mục 1.5.0).
4. **Cooldown:** `hoi_chieu_luot = N` nghĩa là khi skill dùng thành công, cooldown của skill đó được đặt = N. Sau đó áp dụng đúng MỘT quy tắc giảm duy nhất, không có cách hiểu thứ hai:
   > Mỗi khi actor kết thúc một lượt của chính mình (dùng skill, BỎ_LƯỢT chủ động, hoặc bị ép BỎ_LƯỢT do STUN/SILENCE), toàn bộ cooldown >0 của actor đó giảm đúng 1 — kể cả cooldown của skill vừa được dùng ở chính lượt đó không bị giảm thêm lần nữa trong cùng lượt (chỉ được ĐẶT = N ở bước 8, việc GIẢM chỉ tính từ lượt kế tiếp của actor). N=0 nghĩa là không đặt cooldown gì cả, dùng lại ngay ở lượt kế tiếp nếu điều kiện khác hợp lệ.

   Về mặt implementation, việc giảm này nằm trong bước 12a của `thuc_hien_luot_danh` (mục 1.5.3) — chạy cho MỌI lượt của actor, không phân biệt lượt đó có dùng skill hay không.

   **Ví dụ số cụ thể** — skill X có `hoi_chieu_luot = 2`, actor A dùng X ở lượt A1:
   - Cuối lượt A1: cooldown(X) = 2 (vừa đặt ở bước 8 của lượt A1, KHÔNG bị bước 12a trừ thêm trong chính lượt đặt nó).
   - Actor A đi lượt A2 (dù dùng skill khác hay BỎ_LƯỢT): cuối lượt A2, bước 12a trừ cooldown(X) đi 1 → còn 1. Chưa dùng lại X được ở A2.
   - Actor A đi lượt A3: cuối lượt A3, bước 12a trừ cooldown(X) đi 1 → còn 0. X dùng lại được **từ lượt A4** trở đi (cooldown = 0 được kiểm tra ở đầu lượt, mục 1.5.3 bước 5c).
5. **MP:** `chi_phi_mp` của skill bị trừ ngay khi skill được dùng thành công. Actor hồi `mp_hoi_moi_luot` (chỉ số cuối, mục 0.8.4.C) mỗi khi đến lượt actor đó, **trước khi** actor chọn skill (không vượt `mp_toi_da`). Không hồi MP theo thời gian thực hay theo lượt của actor khác.
5a. **Bỏ lượt tự động (`xac_dinh_bo_luot_tu_dong`) — v1.8.0 gom `KHONG_DU_MP`, STUN, SILENCE vào một hàm dùng chung** (mục 1.5.3 bước 4.5 và bước 15): sau bước hồi MP, server xác định `ly_do_bo_luot` theo thứ tự ưu tiên cố định `BI_STUN` > `BI_SILENCE` > `KHONG_DU_MP` — **không trộn lý do**. `KHONG_DU_MP` áp dụng khi tập P = {skill `HOAT_DONG`, cooldown = 0, không bị SILENCE/ROOT chặn} **không rỗng nhưng không skill nào đủ MP**: server tự sinh BỎ_LƯỢT, không chờ client, không trả lỗi, không chờ timeout; MP vừa hồi được giữ nguyên, cooldown > 0 giảm đúng 1 ở cuối lượt. Có ít nhất một skill đủ MP → actor chọn bình thường. **Mọi skill đều đang cooldown** (P rỗng vì cooldown) → **không** phải `KHONG_DU_MP` và không auto-pass: actor BỎ_LƯỢT chủ động (`CHU_DONG`). ROOT mà không có skill hợp lệ cũng chờ BỎ_LƯỢT chủ động (0.8.1.G). *(v1.7.0 mô tả rule này ở đây nhưng không đưa vào flow `thuc_hien_luot_danh` và vòng auto-resolve bước 15 — đã sửa.)*
5b. **Bảng MP/cooldown theo từng trường hợp** (hệ quả trực tiếp của quy tắc 5 và 4 ở trên, liệt kê lại cho rõ, không phải luật mới):

| Trường hợp | Hồi `mp_hoi_moi_luot`? | Trừ `chi_phi_mp`? | Giảm cooldown các skill khác? |
|---|---|---|---|
| Dùng skill bình thường | Có (đầu lượt, trước khi chọn skill) | Có | Có (cuối lượt, bước 12a) |
| BỎ_LƯỢT chủ động | Có | Không (không dùng skill) | Có |
| Bị STUN → tự động BỎ_LƯỢT | Có | Không | Có (mục 0.8.1.E) |
| Bị SILENCE, vẫn còn skill hợp lệ | Có | Có (nếu chọn dùng skill hợp lệ) | Có |
| Bị SILENCE, không còn skill hợp lệ → tự động BỎ_LƯỢT | Có | Không | Có |
| Thiếu MP cho mọi skill sẵn sàng → tự động BỎ_LƯỢT (`KHONG_DU_MP`) | Có | Không | Có |
| Mọi skill đang cooldown → người chơi BỎ_LƯỢT chủ động (`CHU_DONG`) | Có | Không | Có |
| Bị ROOT, dùng skill `BAN_THAN` hợp lệ | Có | Có | Có |
| Bị ROOT, không có skill hợp lệ → BỎ_LƯỢT (client tự chọn) | Có | Không | Có |

6. **DOT/HOT:** hiệu ứng được kích hoạt một lần ở cuối mỗi lượt (mỗi lần có actor hành động) theo chu kỳ của nó, áp dụng cho actor đang mang hiệu ứng bất kể actor đó có phải actor vừa hành động hay không; sau khi kích hoạt giảm `so_luot` 1 và xoá khi hết. Hiệu ứng vừa tạo không được tự kích hoạt thêm ngoài chu kỳ đã định.
7. **Trình tự xử lý 1 lượt:** xác định actor đi tiếp theo bằng ATB (1.5.0) → kiểm tra quyền → hồi MP actor đó → passive `BAT_DAU_LUOT` → xác định BỎ_LƯỢT tự động (4.5) → áp dụng hiệu ứng skill theo đúng thứ tự mảng → passive sau action (7c) → xử lý DOT/HOT đến hạn → kiểm tra kết thúc → cập nhật cooldown/hiệu ứng/`khang_cc`/gauge/`chuoi_luot` → xác định actor kế tiếp. Tất cả trong cùng transaction (chi tiết ở 1.5.3).
8. **HP/khiên:** HP nằm trong [0, HP tối đa]; khiên hấp thụ sát thương trước HP và không âm.
9. **Hồi máu:** không vượt HP tối đa.
10. **SPD quyết định thứ tự lượt qua cơ chế ATB** — xem mục 1.5.0. SPD có thể bị buff/debuff (`EFF_BUFF_SPD`, `EFF_SLOW`) và ảnh hưởng ngay tới tốc độ tích gauge, nhưng `spd_hien_tai` bị clamp trong [50%, 150%] SPD gốc (0.8.1.H) và mọi actor/đội chịu trần lượt liên tiếp (1.5.0).
11. **Timeout:** deadline do server tạo cho actor đang tới lượt; client chỉ hiển thị đồng hồ và không tự quyết định timeout.

### 1.5.0 Cơ chế lượt ATB (Active Time Battle) — thêm ở v1.2, làm rõ ở v1.3, mở rộng tối đa 6 actor + trần lượt ở v1.8.0

Thứ tự lượt được tính từ Tốc độ (SPD). **ATB trong v1 không phải hệ thống thời gian thực:** gauge (`thanh_tich_luy`) chỉ cập nhật khi server xử lý xong một action, không có timer phía client; SPD chỉ quyết định lượng gauge cộng dồn giữa các action bằng công thức closed-form. "Actor A đi 2 lượt liên tiếp" nghĩa là sau khi A hành động, thuật toán tính ra A lại là actor kế tiếp — không phải A có hai cơ hội "cùng lúc". Game vẫn hoàn toàn turn-based (mục 0.3). Mỗi actor **thực sự tồn tại trong trận** (tối thiểu 2, tối đa 6 tùy quân số 1–3/đội đã chọn — xem mục 0.6) có gauge, HP, MP, cooldown, status, passive, skill riêng; **không tồn tại "lượt chung của đội"**.

**Ký hiệu A1/A2/A3/B1/B2/B3 dùng trong toàn tài liệu này là SLOT TỐI ĐA theo vị trí, không phải actor bắt buộc tồn tại.** Số actor thực tế của mỗi đội bằng đúng số nhân vật/AI trong đội hình đã chọn (1, 2 hoặc 3). Ví dụ: trận 1v1 chỉ có A1 và B1 tham gia ATB; trận 1v3 có A1, B1, B2, B3; trận 2v3 có A1, A2, B1, B2, B3. **Không tạo actor giả/rỗng để lấp slot còn thiếu** — ATB, target resolution, snapshot, log và mọi bước của `thuc_hien_luot_danh` chỉ thao tác trên tập actor thực sự tồn tại.

**Tham số cố định:**
- `NGUONG = 1000`; `GIOI_HAN_GAUGE = 2000` (= 2×`NGUONG`); `TRAN_LUOT_ACTOR = 2`; `TRAN_LUOT_DOI = 3`.
- Mỗi actor có `thanh_tich_luy` (gauge), khởi tạo = 0.
- `spd_hien_tai` = `chi_so_cuoi.spd` ± buff/debuff, **clamp theo 0.8.1.H** (thay clamp tối thiểu 1 của v1.7.0).
- `thu_tu_uu_tien` cố định gán lúc khởi tạo, chỉ dùng tie-break: `thu_tu_uu_tien = 2×(vi_tri − 1) + (0 nếu DOI_A, 1 nếu DOI_B)`. Công thức này chỉ phụ thuộc `vi_tri` (vị trí trong chính đội hình của actor đó) và `doi`, **không giả định đội kia cũng có đủ 3 actor** — ví dụ 1v3: DOI_A chỉ có A1 (`thu_tu_uu_tien=0`), DOI_B có B1/B2/B3 (`thu_tu_uu_tien=1/3/5`); công thức vẫn chạy đúng và vẫn đan xen giá trị chẵn/lẻ giữa 2 đội mà không cần đội kia lấp đủ slot. Trường hợp cả hai đội đủ 3 (3v3): A1=0, B1=1, A2=2, B2=3, A3=4, B3=5. `DOI_A` là đội của `nguoi_tao_id` (PvP) hoặc đội người chơi (PvE).
- `chuoi_luot` (lưu trong trạng thái trận): `{actor_id, so_lan_actor, doi, so_lan_doi}` = actor/đội vừa hành động và số action liên tiếp của họ; rỗng ở đầu trận.

**Thuật toán xác định actor đi tiếp theo (chạy sau mỗi lượt, chỉ tính actor sống):**
```text
0. Tập ứng viên C = mọi actor sống.
   a. Nếu chuoi_luot.so_lan_actor ≥ TRAN_LUOT_ACTOR và còn actor sống khác → loại actor đó khỏi C.
   b. Nếu chuoi_luot.so_lan_doi ≥ TRAN_LUOT_DOI và đội kia còn actor sống → loại mọi actor của đội vừa đi khỏi C.
1. Với mỗi i thuộc C: so_tick_can[i] = MAX(0, ceil((NGUONG - thanh_tich_luy[i]) / spd_hien_tai[i]))
2. actor_tiep_theo = actor trong C có so_tick_can nhỏ nhất.
   - Bằng nhau: ưu tiên spd_hien_tai cao hơn.
   - Vẫn bằng nhau: ưu tiên thu_tu_uu_tien nhỏ hơn.
3. buoc = so_tick_can[actor_tiep_theo]
4. Với MỌI actor sống i (kể cả actor ngoài C):
   thanh_tich_luy[i] = MIN(GIOI_HAN_GAUGE, thanh_tich_luy[i] + buoc * spd_hien_tai[i])
5. Sau khi actor_tiep_theo hành động xong: thanh_tich_luy[actor_tiep_theo] -= NGUONG
   (giữ phần dư, KHÔNG reset về 0) và cập nhật chuoi_luot theo actor/đội vừa hành động
   (cùng actor/đội với lần trước: +1; khác: đặt lại = 1).
```
Actor chết bị loại khỏi tính toán ngay (không tích gauge, không nằm trong C). Server tính thẳng bằng công thức, không lặp từng tick.

**Ý nghĩa của hai trần:** trần không xóa lợi thế SPD, chỉ chặn nó biến thành quyền sở hữu vòng lặp: actor nhanh vẫn được đi 2 lượt liên tiếp; đội nhanh vẫn có tối đa 3 action liền nhau (mỗi người một lượt) nhưng **đội kia có cơ hội phản ứng trước khi actor thứ 4 của đội nhanh hành động, với điều kiện đội đó vẫn còn ít nhất một actor sống và đủ điều kiện được ATB chọn tại thời điểm đó** — trần lượt liên tiếp không phải một cam kết tuyệt đối rằng đội đối phương chắc chắn sống sót đủ lâu để dùng cơ hội đó (ví dụ 3 actor có thể xóa sổ toàn bộ đội kia trong 3 action liên tiếp trước khi trần kích hoạt, nếu combat state cho phép; hiện tượng này được đo bằng metric Dead-before-acting ở mục 0.14). Trần thường không kích hoạt trong trận bình thường (tỉ lệ SPD Class ≤ 2:1); nó là lưới an toàn cho tổ hợp buff/slow cực đoan. Gauge của actor bị loại tạm khỏi C vẫn tích (tối đa `GIOI_HAN_GAUGE`) nên không mất lượt, chỉ bị hoãn.

**Invariants (có test ở 0.15):**
- **INV-ATB-1:** khi còn ≥ 2 actor sống, không actor nào hành động quá `TRAN_LUOT_ACTOR` lần liên tiếp.
- **INV-ATB-2:** khi cả hai đội còn actor sống, không đội nào hành động quá `TRAN_LUOT_DOI` lần liên tiếp.
- **INV-ATB-3:** mọi actor sống có `spd_hien_tai ≥ 1`, trong dải clamp; `0 ≤ thanh_tich_luy ≤ GIOI_HAN_GAUGE` khi ở trạng thái lưu.
- **INV-ATB-4:** actor chết không bao giờ là `actor_dang_di`.

**Dự báo thứ tự (read-model, P1):** server có thể trả `du_bao_thu_tu` (6 actor kế tiếp) bằng cùng thuật toán trên một bản sao trạng thái, giả định status không đổi; chỉ để hiển thị, không có hiệu lực.

**Yêu cầu UI bắt buộc cho ATB (mới ở v2.0.0 — presentation-only, không đổi engine):** client phải render `du_bao_thu_tu` thành một **hàng đợi lượt tường minh** (dãy icon actor theo đúng thứ tự dự kiến, ví dụ `A1 → B1 → A2 → B2 → ...`), **không** được hiển thị dưới dạng thanh gauge chạy/mờ dần hay chỉ một con số trừu tượng — lý do: cả vòng audit kỹ thuật (ChatGPT) lẫn vòng audit trải nghiệm (Gemini) độc lập chỉ ra cùng một rủi ro là ATB "cảm giác random" nếu không thấy rõ thứ tự. Hàng đợi cập nhật lại ngay khi server trả state mới (SPD đổi do buff/debuff, actor chết bị loại khỏi hàng đợi) — client chỉ vẽ lại theo `du_bao_thu_tu` mới, không tự suy luận.

### 1.5.0a Randomness & Determinism Contract — mới ở v1.9.0 (đóng gap: chưa từng có contract RNG tường minh)

> **Vấn đề tìm thấy khi red-team v1.8.1:** toàn tài liệu chỉ nói "random do server sinh" (`NGAU_NHIEN_N_DICH`, mục 1.5.3) mà chưa từng định nghĩa **thuật toán RNG, nguồn seed, và thời điểm consume** — nghĩa là không có cách nào chứng minh được OFF-08 (Local Runtime và Online Runtime cho cùng kết quả với cùng input) một khi combat có yếu tố ngẫu nhiên, vì "random của JS `Math.random()` trên thiết bị A" và "random của server B" không có lý do gì trùng nhau. Đây là lỗ hổng determinism thật, không phải chi tiết vặt — chốt ở đây.

**Phạm vi random trong Shared Combat Engine:** duy nhất **một** điểm dùng ngẫu nhiên trong toàn bộ combat — resolve mục tiêu của `doi_tuong = NGAU_NHIEN_N_DICH` (mục 1.5.3). Không có hit/miss, không có crit ngẫu nhiên, không có variance sát thương, AI hoàn toàn deterministic (mục 1.5.4) — nên bề mặt cần RNG là tối thiểu, không cần một hệ thống RNG phức tạp.

**Quyết định (ADR-04, xem mục 0.1a):**
- Shared Combat Engine dùng một **PRNG thuần thuật toán, seed được** (ví dụ mulberry32/xorshift32 — bất kỳ PRNG 32-bit thuần hàm số, không phụ thuộc thư viện hệ điều hành/trình duyệt nào đều chấp nhận được, miễn Local Runtime và Online Runtime dùng **cùng một implementation thuật toán** vì đây là JS/TS chạy trên cả hai). **Không dùng `Math.random()`/`crypto.getRandomValues()`** trực tiếp cho combat vì không seed lại được.
- **Seed gốc của một trận** = hàm băm quyết định của `tran_dau_id` (hoặc `nguoi_choi_local_id` + timestamp bắt đầu cho PvE, miễn giữ cố định suốt trận) — sinh **một lần** tại `bat_dau_tran`, lưu vào `trang_thai_chien_dau.rng_seed` (mới, xem mục 1.5.1), snapshot cùng lúc với mọi state khác.
- **Mỗi lần cần 1 số ngẫu nhiên** (một lần resolve `NGAU_NHIEN_N_DICH`), engine gọi PRNG đúng 1 lần theo **đúng thứ tự effect được áp dụng** (thứ tự mảng `danh_sach_hieu_ung`, mục 0.8.1.L) và **advance state nội bộ của PRNG**, lưu lại state đó (`rng_state`) vào `trang_thai_chien_dau` sau mỗi lần dùng — không seed lại từ đầu mỗi lượt. Điều này đảm bảo: với cùng seed gốc + cùng chuỗi hành động theo cùng thứ tự, số ngẫu nhiên sinh ra ở bước thứ N luôn giống hệt nhau dù chạy trên Local hay Online Runtime.
- **Không dùng tie-break bằng random** ở bất kỳ đâu khác trong engine — mọi tie-break khác (ATB, CLEANSE/DISPEL FIFO, victory) đã deterministic thuần bằng `thu_tu_uu_tien`/thứ tự mảng (mục 1.5.0, 0.8.1.J), không cần RNG.
- **Log bắt buộc:** mỗi lần PRNG được gọi, `nhat_ky_luot_danh` ghi lại `rng_state` **trước** lần gọi đó và actor được chọn — cho phép replay/audit một trận chỉ từ log mà không cần chạy lại toàn bộ combat.

**Test tương đương Local ↔ Online (đóng section 9 của audit — SPEC-VERIFIABLE + IMPLEMENTATION-VERIFIABLE):**
```text
Fixture cố định: cùng content snapshot + cùng actors[] ban đầu + cùng rng_seed + cùng chuỗi (action, target) theo thứ tự
→ chạy qua Local Runtime  → canonical result A (state cuối + toàn bộ nhat_ky_luot_danh)
→ chạy qua Online Runtime → canonical result B (state cuối + toàn bộ nhat_ky_luot_danh)
assert A == B (so sánh bằng cấu trúc, bỏ qua timestamp/latency)
```
Đây là test **IMPLEMENTATION-VERIFIABLE** (cần code thật để chạy), nhưng **contract khiến nó verifiable được** (seed cố định, PRNG thuần thuật toán, log đủ state) là **SPEC-VERIFIABLE** — đọc đặc tả này đã đủ để biết cần implement gì để test đó có thể viết được. Team viết đúng 1 bộ fixture (JSON) tái sử dụng cho cả hai runtime, không cần 2 bộ test riêng.

### 1.5.1 Cấu trúc snapshot combat tối thiểu

```json
{
  "actors": [
    {
      "actor_id": "A1",
      "doi": "DOI_A",
      "vi_tri": 1,
      "dieu_khien": "NGUOI_CHOI",
      "nguoi_choi_id": "uuid-nguoi-choi-1",
      "nhan_vat_id": "uuid-nhan-vat-1",
      "ten_hien_thi": "Kiếm Sĩ An",
      "thu_tu_uu_tien": 0,
      "hp_hien_tai": 784,
      "hp_toi_da": 784,
      "mp_hien_tai": 60,
      "mp_toi_da": 60,
      "shield_hien_tai": 0,
      "spd_hien_tai": 106,
      "thanh_tich_luy": 0,
      "khang_cc": 0,
      "buff": [],
      "debuff": [],
      "dot": [],
      "hot": [],
      "cooldowns": {}
    },
    {
      "actor_id": "B1",
      "doi": "DOI_B",
      "vi_tri": 1,
      "dieu_khien": "AI",
      "nguoi_choi_id": null,
      "nhan_vat_id": null,
      "ten_hien_thi": "Xạ Thủ (AI)",
      "thu_tu_uu_tien": 1,
      "hp_hien_tai": 600,
      "hp_toi_da": 600,
      "mp_hien_tai": 50,
      "mp_toi_da": 50,
      "shield_hien_tai": 0,
      "spd_hien_tai": 100,
      "thanh_tich_luy": 0,
      "khang_cc": 0,
      "buff": [],
      "debuff": [],
      "dot": [],
      "hot": [],
      "cooldowns": {}
    }
  ],
  "actor_dang_di": "A1",
  "so_luot": 1,
  "chuoi_luot": { "actor_id": null, "so_lan_actor": 0, "doi": null, "so_lan_doi": 0 },
  "rng_seed": "u32-hoặc-string, sinh 1 lần tại bat_dau_tran (mục 1.5.0a)",
  "rng_state": "trạng thái nội bộ PRNG hiện tại, advance sau mỗi lần NGAU_NHIEN_N_DICH dùng tới (mục 1.5.0a)"
}
```

Ví dụ trên rút gọn còn 2 actor để dễ đọc; `actors[]` thật chứa đúng số actor của quân số đã chọn mỗi đội (1–3/đội, xem mục 0.6/1.5.0) với cùng cấu trúc từng phần tử — ví dụ 1v1 chỉ có 2 phần tử (A1, B1), 3v3 mới có đủ 6 (A1–A3, B1–B3). `doi` (`DOI_A`/`DOI_B`) xác định đội; `dieu_khien` (`NGUOI_CHOI`/`AI`) xác định ai điều khiển — **hai khái niệm tách biệt** (v1.7.0 gộp thành `phe`, mơ hồ trong PvP). Một người chơi điều khiển mọi actor thuộc đội mình (`nguoi_choi_id` giống nhau ở mọi actor `DOI_A` nếu là PvP/PvE của người đó). Mỗi phần tử trong `buff`/`debuff` gồm tối thiểu `ma_hieu_ung`, `nhom`, tham số hiệu lực, `so_luot` còn lại, `nguon_actor_id` và thứ tự áp dụng (phục vụ FIFO của CLEANSE/DISPEL). Tên field nội bộ có thể điều chỉnh khi triển khai, nhưng ý nghĩa trạng thái và cấu trúc mảng không được thay đổi.

### 1.5.2 Khởi tạo trận (`bat_dau_tran`)

```text
Input theo runtime (mục 0.2, 2.2):
- **Local Runtime (PvE):** loai_tran, đội hình người chơi = mảng **1–3** `nhan_vat_id` (tham chiếu bảng `nhan_vat` local, đọc trực tiếp — Local Runtime có toàn quyền truy cập dữ liệu trên chính thiết bị), cau_hinh_doi_thu = `doi_ai[]` 1–3 phần tử (mục 0.7.12). `che_do_tier` luôn `TU_DO`.
- **Online Runtime (PvP):** loai_tran, đội hình mỗi người chơi = mảng **1–3 `nhan_vat_payload`** đã qua đủ 7 bước validate ở mục 2.2 (server không có bảng `nhan_vat` để tra `nhan_vat_id`), `che_do_tier` = của `phong_choi`.

0. GUARD: loai_tran ≠ PVP_DI_AI_CUNG_NHAU (bảo lưu ở v1.8.0). Mỗi đội hình có **1–3** phần tử (không bắt buộc đúng 3), phân biệt; PvE: `nhan_vat_id` thuộc đúng `nguoi_choi_local_id`, `diem_*` hợp lệ (tổng 5, hoặc 0 với legacy) đọc trực tiếp từ `nhan_vat`; PvP: `nhan_vat_payload` đã qua validate 2.2 (không validate lại quyền sở hữu, chỉ tính toàn vẹn dữ liệu — đã làm ở 2.2, làm lại ở đây là phòng trường hợp gọi `bat_dau_tran` trực tiếp ngoài luồng UI). Đội AI 1–3 phần tử hợp lệ theo schema mục 0.7.12, gồm cả `tier`. Hai đội **không cần** bằng số lượng actor. Vi phạm (0 nhân vật, >3 nhân vật, trùng trong cùng đội hình, sai chủ sở hữu ở PvE, hoặc sai schema payload ở PvP) → từ chối, không tạo tran_dau.
1. Tạo `tran_dau`: trang_thai = DANG_DIEN_RA, phien_ban_engine = '2.1.0', che_do_tier theo trên.
2. Chốt `du_lieu_noi_dung_snapshot`: với MỖI actor sao chép nguyên vẹn — chỉ số nền Class (+ mp_nen, mp_hoi_moi_luot), **tier + he_so_tier_ap_dung (= 1.00 nếu che_do_tier = CAN_BANG, mục 0.8.4.B)**, phan_bo_diem, he_so_quy_doi, chi_so_cuoi (tinh_chi_so_cuoi, mục 0.8.4), toàn bộ định nghĩa Nội tại Class đang hoạt động (trigger, điều kiện, danh_sach_hieu_ung + tham số), định nghĩa đầy đủ từng skill trong ky_nang_trang_bi (danh_sach_hieu_ung, hoi_chieu_luot, chi_phi_mp, mo_ta), cùng nhãn hiển thị (ten_nhan_vat hoặc ten_co_dinh, class_ma, ten Class) để log tự mô tả. Bản chụp bất biến, không tham chiếu id sống — với PvP, dữ liệu đến từ payload đã validate, không từ bảng `nhan_vat` (không tồn tại phía server).
3. Dựng actors[] (tối đa 6): mỗi nhân vật/AI thành 1 actor với actor_id, doi, vi_tri, dieu_khien, thu_tu_uu_tien theo mục 1.5.0. HP/MP hiện tại = tối đa (chỉ số cuối), shield = 0, thanh_tich_luy = 0, khang_cc = 0, buff/debuff/DOT/HOT rỗng, cooldown = 0, chuoi_luot rỗng. Sau khi dựng xong, xử lý Nội tại `BAT_DAU_TRAN` đúng 1 lần cho từng actor sống, theo thu_tu_uu_tien tăng dần (mục 0.8.2).
4. Xác định actor đi đầu tiên bằng thuật toán ATB mục 1.5.0 (gauge = 0 cho mọi actor; chỉ tie-break bằng SPD rồi thu_tu_uu_tien).
5. Ghi luot_hien_tai_bat_dau_luc và han_luot_luc bằng thời gian server nếu là PvP.
6. Trả về tran_dau.id và snapshot trạng thái chuẩn cho client.
```

**Vì sao cần bước 2:** Dev Mode (Phần 3) cho phép sửa Class/Skill có hiệu lực ngay (mục 3.9), và người chơi có thể phân bổ lại điểm bất cứ lúc nào. Nếu không chốt snapshot lúc bắt đầu trận, một trận đang diễn ra có thể đổi chỉ số/hiệu ứng giữa chừng — vừa phá tính xác định của engine, vừa khiến `nhat_ky_luot_danh` không tra cứu lại được phiên bản đã dùng. Chốt snapshot giải quyết cả hai: **trận đang chạy luôn dùng đúng một phiên bản dữ liệu cố định, và log trận cũ tự mô tả đúng phiên bản đã áp dụng**. Sửa sau đó chỉ ảnh hưởng trận **mới**.

**Phạm vi snapshot — nói rõ để không ai hiểu nhầm là thiếu sót:**
- **PHẢI có:** mọi dữ liệu combat engine thực sự đọc để tính toán — chỉ số nền, `phan_bo_diem`, `he_so_quy_doi`, `chi_so_cuoi`, Nội tại Class (trigger, điều kiện, effect + tham số), skill trang bị (effect + tham số, cooldown, MP cost) và nhãn hiển thị cho log.
- **KHÔNG cần (loại trừ có chủ đích):** dữ liệu ngoại hình/paper-doll, ảnh đại diện, mô tả marketing — combat engine không đọc; UI lấy từ bảng sống.
- **Actor AI cũng snapshot y hệt actor người chơi:** nguồn là `man_choi.cau_hinh_ai.doi_ai[]` (Đi ải) hoặc cấu hình đội AI cố định theo seed (Đối kháng). Ở v1.8.0 Dev Mode không có màn quản lý `man_choi`, nhưng vẫn snapshot để nhất quán và không phải sửa engine nếu sau này mở rộng.
- **Registry 19 hiệu ứng KHÔNG cần snapshot riêng** (hằng số cấp code, đóng); chỉ *tham số* Skill/Passive truyền vào effect mới cần snapshot.
- **Cấm fallback tuyệt đối:** `thuc_hien_luot_danh` không được, trong bất kỳ trường hợp nào, đọc lại bảng `class`/`ky_nang`/`noi_tai_class`/`nhan_vat` sống để lấy dữ liệu combat khi trận đã có snapshot. Nếu snapshot thiếu định nghĩa của một skill được yêu cầu → từ chối hành động với lỗi rõ ràng, không âm thầm lấy bù từ bảng sống.

### 1.5.3 Xử lý một lượt đánh (`thuc_hien_luot_danh`) — TRANSACTION NGUYÊN TỬ

> **Nơi thực thi (chốt ở v1.8.1 — xem mục 0.2):** toàn bộ bước 0–15 dưới đây là logic của **Shared Combat Engine**, chạy trong **application/server runtime** (ví dụ Edge Function hoặc backend service) — **không phải PL/pgSQL chạy bên trong PostgreSQL**. Với Online Runtime (PvP): engine tính state mới trong tiến trình application, rồi application ghi kết quả xuống PostgreSQL bằng **một transaction/lệnh ghi nguyên tử** (có thể lộ ra ngoài dưới dạng một RPC/hàm SQL, nhưng hàm đó chỉ chịu trách nhiệm khoá bản ghi + ghi atomic + transaction boundary, **không chứa logic tính damage/target/ATB/passive** — logic đó luôn nằm ở application layer, dùng chung với Local Runtime). Với Local Runtime (PvE): đúng engine này chạy in-process trên thiết bị, kết quả ghi vào local storage (không có PostgreSQL, không có khái niệm RPC). `thuc_hien_luot_danh` là **tên của primitive/hợp đồng (contract)**, không phải tên một PL/pgSQL function cụ thể.

```text
Input: tran_dau_id, nguoi_thuc_hien_id, ky_nang_id hoặc BỎ_LƯỢT, target_actor_id (tuỳ chọn — xem quy tắc target bên dưới)

0. KHOÁ bản ghi tran_dau tương ứng (row lock kiểu SELECT...FOR UPDATE hoặc cơ chế concurrency tương đương — optimistic lock bằng version column cũng chấp nhận được) NGAY từ đầu, giữ đến khi COMMIT/ROLLBACK. Với Online Runtime, bước khoá này thực hiện bằng một lệnh ghi/khoá tới PostgreSQL do application phát ra trong cùng transaction sẽ dùng để commit kết quả ở bước 14 — không phải một bước tính toán gameplay. Bất biến bắt buộc: không được có hai giao dịch đồng thời cùng đọc actor_dang_di của cùng một tran_dau rồi cùng vượt qua guard #3 — chỉ tối đa một request thắng cuộc đua.
1. GUARD: tran_dau.trang_thai = DANG_DIEN_RA.
2. GUARD: xác thực người gọi có quyền điều khiển đúng actor_dang_di hiện tại; không tin ID do client tự khai. Cụ thể (chốt rõ, đóng blocker #8 của audit v1.5):
   - Với actor người chơi: server lấy authenticated identity của người gọi từ session/auth context (không phải từ body request), đối chiếu identity đó với `nguoi_choi_id` đang sở hữu `actor_dang_di` hiện tại (tra qua `actors[].nguoi_choi_id` của `tran_dau`; một người chơi điều khiển mọi actor thuộc đội mình, nhưng chỉ actor đang tới lượt).
   - `nguoi_thuc_hien_id` nếu client gửi kèm trong request chỉ là dữ liệu tham khảo/logging, không có giá trị quyết định actor nào được phép hành động — server luôn dùng identity từ auth context để quyết định, không dùng giá trị client gửi.
   - Với actor AI: hành động AI (mục 1.5.4) chỉ được sinh và gọi `thuc_hien_luot_danh` từ đường gọi server-side tin cậy (từ tầng application ngay sau khi transaction của lượt trước COMMIT — xem vòng lặp auto-resolve ở bước 15 — hoặc từ job nội bộ có quyền tương đương) — không tồn tại API công khai cho phép client tự đóng giả yêu cầu "AI hành động". Cùng cơ chế trusted server-side này áp dụng cho hành động BỎ_LƯỢT tự sinh (`BI_STUN`, `BI_SILENCE`, `KHONG_DU_MP` — hàm `xac_dinh_bo_luot_tu_dong`) (mục 4.5, bước 15) — không có "client" thật nào gọi các invocation đó, GUARD 2/3 coi các lệnh gọi này là hợp lệ vì chúng đến từ chính vòng lặp auto-resolve nội bộ ở tầng application, không phải request bên ngoài do người chơi gửi.
   - Acceptance test: đăng nhập bằng người chơi A nhưng gửi `nguoi_thuc_hien_id`/actor thuộc về người chơi B → bị từ chối (xem checklist P0 ở mục 0.12).
3. GUARD: đúng lượt (actor gọi API phải trùng actor_dang_di); với PvP kiểm tra deadline server.
4. Hồi MP cho actor_dang_di: mp_hien_tai += mp_hoi_moi_luot, clamp ≤ mp_toi_da.
4.25. **PASSIVE PRE-ACTION:** nếu Nội tại Class của actor có trigger `BAT_DAU_LUOT`, kiểm tra điều kiện và áp dụng passive theo mục 0.8.2 trước khi chờ input. Effect passive được ghi vào log lượt hiện tại, nhưng không tạo một lượt/transaction riêng.
4.5. **PRE-ACTION AVAILABILITY GUARD** *(viết lại v1.8.0: gom mọi trường hợp auto-pass vào một hàm)*: server gọi hàm dùng chung `xac_dinh_bo_luot_tu_dong(trang_thai, actor)` — cũng chính là hàm mà bước 15 gọi để biết có auto-resolve hay không — trả về `ly_do_bo_luot` hoặc NULL, theo thứ tự ưu tiên cố định (không trộn lý do):
   a. **`BI_STUN`:** actor đang mang `EFF_STUN` (theo 0.8.1.E).
   b. **`BI_SILENCE`:** actor đang mang `EFF_SILENCE` và tập S = {skill thuộc `ky_nang_trang_bi`, `HOAT_DONG`, cooldown = 0, **không** chứa effect nhóm `HOI_PHUC`/`BUFF`/`TIEN_ICH` (theo 0.8.1.F)} **rỗng** (không xét MP ở điều kiện này).
   c. **`KHONG_DU_MP`:** không rơi vào a/b, và tập P = {skill `HOAT_DONG`, cooldown = 0, không bị SILENCE/ROOT chặn} **không rỗng nhưng không skill nào có `chi_phi_mp ≤ mp_hien_tai`** (sau bước 4). Khi tính ở bước 15 (trước khi actor đó thực sự vào lượt), application dự báo MP sau hồi = `MIN(mp_hien_tai + mp_hoi, mp_toi_da)`.
   d. **NULL:** actor chờ input từ client — gồm cả ROOT không có skill hợp lệ, hoặc mọi skill đang cooldown (actor tự gửi BỎ_LƯỢT chủ động, ghi `CHU_DONG`; server không tự thay).
   Nếu a/b/c trả về lý do: hành động của lượt này **luôn luôn** là BỎ_LƯỢT do server sinh — server **không đọc, không chờ** `ky_nang_id`/`target_actor_id` dù client gửi kèm; không trừ MP (ngoài phần đã hồi ở bước 4), không đặt cooldown mới, không áp dụng effect; `ly_do_bo_luot` ghi vào log. Bỏ qua bước 5, sang bước 6, rồi tiếp tục từ bước 7.
   Nếu actor đang SILENCE và S **không rỗng**, flow tiếp tục ở bước 5: client phải chọn skill trong S; GUARD ở bước 5c2 vẫn chạy như lớp validate độc lập (phòng client cố gửi skill bị cấm). `EFF_ROOT` không có bước auto (rule 0.8.1.G).

5. Nếu dùng skill (và không rơi vào nhánh 4.5a/4.5b/4.5c ở trên):
   a. Skill phải nằm trong ky_nang_trang_bi.
   b. Đọc định nghĩa skill từ `tran_dau.du_lieu_noi_dung_snapshot` (KHÔNG đọc bảng `ky_nang` sống) — đảm bảo dùng đúng phiên bản đã chốt lúc bắt đầu trận, kể cả khi Dev đã sửa skill này ở nơi khác trong lúc trận đang diễn ra. Nếu skill không tìm thấy trong snapshot vì bất kỳ lý do gì → từ chối hành động ngay, KHÔNG fallback sang bảng sống (xem "Cấm fallback tuyệt đối" ở mục 1.5.2).
   c. Skill phải HOAT_DONG tại thời điểm snapshot, thuộc đúng class và cooldown hiện tại = 0.
   c2. **GUARD SILENCE/ROOT** (chốt rõ, đóng blocker #6 của audit v1.5 — trước đây chỉ nằm ở mục 0.8.1.F/G, nay liệt kê tường minh trong flow chính): nếu actor đang mang `EFF_SILENCE`, skill được chọn không được chứa bất kỳ effect nào thuộc nhóm `HOI_PHUC`/`BUFF`/`TIEN_ICH` trong `danh_sach_hieu_ung` (theo 0.8.1.F); nếu actor đang mang `EFF_ROOT`, MỌI effect trong `danh_sach_hieu_ung` của skill phải có `doi_tuong = BAN_THAN` (theo 0.8.1.G). Vi phạm một trong hai → từ chối hành động, trả lỗi rõ ràng (không phải BỎ_LƯỢT ngầm).
   d. GUARD MP: mp_hien_tai của actor phải ≥ chi_phi_mp của skill (theo snapshot); nếu không đủ → từ chối hành động (lỗi rõ ràng, không cho gửi wrong-cost).
   e. Validate `danh_sach_hieu_ung` (từ snapshot) theo registry/schema server-side.
   f. **GUARD TARGET** (mới ở v1.5 — xem chi tiết "Quy tắc chọn & validate target" ngay dưới bảng này): với mỗi effect trong `danh_sach_hieu_ung` có `doi_tuong` thuộc nhóm cần chọn 1 mục tiêu cụ thể (`MOT_DICH`, `MOT_DONG_DOI`), server tự resolve mục tiêu theo quy tắc đó; nếu quy tắc yêu cầu client cung cấp `target_actor_id` mà thiếu, hoặc `target_actor_id` không hợp lệ với `doi_tuong`/phe/trạng thái sống → từ chối hành động, không tự đoán thay.
6. Nếu BỎ_LƯỢT: không áp dụng hiệu ứng, không trừ MP.
7. Nếu dùng skill:
   a. Trừ chi_phi_mp khỏi mp_hien_tai của actor.
   b. Đọc `danh_sach_hieu_ung` và áp dụng ĐÚNG THỨ TỰ: xác định đối tượng (theo target đã resolve ở bước 5f) → tính giá trị từ tham số + chỉ số/trạng thái hiện tại theo đúng công thức mục 0.8.1 → cập nhật HP/khiên/buff/debuff/DOT/HOT.
   c. **PASSIVE EVENT RESOLUTION (bước 7c — mới v1.8.0, sửa dead enum):** sau khi toàn bộ effect ở 7b đã áp dụng, xử lý Nội tại theo mục 0.8.2 với thứ tự: (1) `KHI_SU_DUNG_SKILL` của actor thi triển; (2) `KHI_GAY_SAT_THUONG` của actor thi triển nếu action gây ≥ 1 HP thực tế; (3) `KHI_NHAN_SAT_THUONG` của từng actor mất ≥ 1 HP thực tế (theo `thu_tu_uu_tien` tăng dần). Actor `hp ≤ 0` bị bỏ qua. Effect passive mang `nguon = NOI_TAI` và **không** kích hoạt passive nào khác (chain depth = 1). Effect passive được ghi vào log của chính lượt này, không tạo lượt/transaction riêng.
8. Skill dùng thành công → đặt cooldown theo quy ước mục 1.5 (đếm theo lượt của chính actor đó).
9. Xử lý DOT/HOT đến hạn cho mọi actor còn sống (`hp > 0` tại thời điểm bước 9 bắt đầu, tối đa 6 actor); giảm số lượt và xoá hiệu ứng hết hạn. Tick DOT/HOT mang `nguon = DOT_HOT` và **không** kích hoạt passive sát thương (0.8.2).
10. Clamp HP/khiên/MP về miền hợp lệ.
11. Kiểm tra kết quả trận theo mục 1.5.5 (đội bị xóa sổ, hòa khi cùng bị xóa sổ, giới hạn hành động). Nếu trận kết thúc:
    → KET_THUC, ghi `ket_qua` + `actor_ids_thang` (xem mục 0.7.13) + log, không tính actor kế tiếp.
12. Nếu chưa kết thúc:
    a. Cập nhật cooldown/hiệu ứng/gauge của actor vừa đi theo mục 1.5.0 (bao gồm giảm `so_luot` nhóm A theo đúng thời điểm ở mục 0.8.1.M; xử lý `khang_cc` và CC hết hạn theo mục 0.8.5; cập nhật `chuoi_luot` theo mục 1.5.0).
    b. Chạy thuật toán ATB (1.5.0) để xác định actor_dang_di kế tiếp trong số các actor còn sống. Chỉ xác định và ghi giá trị này vào trạng thái sẽ lưu ở bước 13; **không** gọi lại `thuc_hien_luot_danh` hay thực hiện bất kỳ lượt nào khác ở bước này — việc đó chuyển hẳn sang bước 15 (sau COMMIT).
    c. Với PvP, server tạo timestamp lượt mới và deadline mới cho actor kế tiếp vừa xác định ở 12b (deadline này sẽ vô nghĩa nếu actor đó rơi vào auto-resolve ở bước 15, vì actor đó sẽ được xử lý xong trước khi có thể chạm ngưỡng timeout — không cần xử lý đặc biệt gì thêm ở đây, chỉ đặt theo quy tắc bình thường).
13. Ghi một phần tử vào `nhat_ky_luot_danh` theo đúng schema mở rộng ở mục 0.7.13: actor, hành động, skill (nếu có), passive đã kích hoạt (nếu có), target đã resolve, MP tiêu tốn, `so_luot` (version) của lượt này, mảng `hieu_ung_ap_dung[]` theo đúng thứ tự đã thực thi ở bước 7b (kèm effect nào bị bỏ qua vì target đã chết), HP/MP/trạng thái sau lượt, `ly_do_bo_luot` (nếu có), `so_lua_chon_hop_le`, `passive_kich_hoat[]`, `actor_chet[]`, đội của actor/target (mục 0.7.14), timestamp server.
14. COMMIT toàn bộ **lượt hiện tại** (bước 0-13) trong một transaction. Không bước nào của lượt hiện tại được thực hiện riêng lẻ ngoài transaction này. Đây là điểm kết thúc của MỘT invocation `thuc_hien_luot_danh` — trả kết quả/snapshot mới cho phía gọi (client hoặc vòng lặp auto-resolve ở bước 15).

15. **AUTO-RESOLVE LOOP** (chạy ở tầng application/request, **SAU KHI** transaction ở bước 14 đã COMMIT thành công — chốt lại ở v1.6.2, thay cho mô tả "transaction riêng lồng trong bước 12b" ở v1.6.1 vốn mâu thuẫn với invariant "một lượt = một transaction" ở mục 0.2):
    a. Sau khi transaction ở bước 14 COMMIT, tầng application (edge function/RPC caller) đọc `actor_dang_di` vừa được xác định ở bước 12b của lượt vừa COMMIT.
    b. Nếu actor đó (i) là AI, hoặc (ii) hàm `xac_dinh_bo_luot_tu_dong` (bước 4.5) trả về lý do khác NULL (`BI_STUN`, `BI_SILENCE` hoặc `KHONG_DU_MP`) → application gọi **LẠI** đúng primitive `thuc_hien_luot_danh` này cho actor đó (AI: hành động theo thuật toán 1.5.4; các trường hợp còn lại: BỎ_LƯỢT theo bước 4.5) như một **invocation hoàn toàn mới, tự mở transaction DB riêng của chính nó** — chạy đủ bước 0-14 độc lập, tự khoá bản ghi (bước 0), tự ghi log (bước 13), tự COMMIT (bước 14) của chính invocation đó.
    c. Application **phải đợi** invocation vừa gọi COMMIT thành công rồi mới đọc `actor_dang_di` mới (kết quả của chính invocation đó, xác định lại ở bước 12b của invocation đó) để quyết định có tiếp tục lặp hay dừng — **không** gọi invocation kế tiếp song song, không gọi trước khi invocation trước COMMIT xong. Mỗi invocation trong chuỗi là một đơn vị transaction độc lập với các invocation khác — không phải nested/savepoint bên trong nhau.
    d. Lặp lại (a)-(c) cho tới khi `actor_dang_di` là một actor cần input thật từ client (actor người chơi mà `xac_dinh_bo_luot_tu_dong` trả NULL — kể cả actor đang ROOT, actor có mọi skill đang cooldown, hoặc SILENCE còn skill hợp lệ đều cần client tự gửi hành động). Vòng lặp luôn kết thúc vì mọi action (kể cả auto-pass) tăng `so_luot` và trận bị chặn bởi `GIOI_HAN_HANH_DONG` (mục 1.5.5), hoặc trận đã `KET_THUC`.
    e. Nếu một invocation trong chuỗi lỗi và transaction của nó ROLLBACK (ví dụ vi phạm GUARD nội bộ không mong muốn), chỉ transaction của **chính invocation đó** rollback — các transaction đã COMMIT trước đó trong chuỗi (kể cả lượt gốc ở bước 14 và mọi auto-pass trước đó) **giữ nguyên, không bị rollback ngược**, vì chúng là các transaction độc lập đã hoàn tất.
    f. Đây là lý do PvP không cần chờ đủ 90 giây `han_luot_luc` cho một actor vốn không được phép hành động: chuỗi auto-resolve chạy ngay ở tầng application, tiếp nối liền mạch sau khi transaction gây ra trạng thái STUN/SILENCE COMMIT, trong cùng vòng đời xử lý của request/RPC call ban đầu (application-level), dù mỗi bước trong chuỗi là một database transaction riêng biệt. Realtime phát một event riêng sau **mỗi** COMMIT trong chuỗi (mỗi invocation tăng `so_luot` độc lập theo đúng thứ tự), không gộp nhiều lượt vào một event.
    g. Không tạo combat engine thứ hai: toàn bộ chuỗi chỉ gọi lại đúng 1 primitive `thuc_hien_luot_danh` đã có, nhiều lần, tuần tự.

    **Pseudoflow minh hoạ:**
    ```
    TX #1: bước 0-14 của lượt A (actor A dùng skill gây STUN lên B) → COMMIT
      → (application, SAU khi TX #1 COMMIT) actor kế tiếp = B, đang STUN
      → TX #2: bước 0-14 của lượt auto-pass B → COMMIT
        → actor kế tiếp = AI, đủ điều kiện dùng skill
        → TX #3: bước 0-14 của lượt AI → COMMIT
          → actor kế tiếp = người chơi thật, không STUN/SILENCE-khoá
          → DỪNG vòng lặp; server trả kết quả cho request ban đầu (client nhận Realtime event của cả TX #1, #2, #3 theo thứ tự), chờ input thật từ actor đó.
    ```
```

**Quy tắc chọn & validate target (v1.5, mở rộng cho 3v3 ở v1.8.0):**

Mỗi effect trong `danh_sach_hieu_ung` mang `doi_tuong` riêng. Server resolve mục tiêu **trước khi** áp dụng, theo `doi_tuong` của chính effect đó. "Địch" = actor sống thuộc đội khác; "đồng đội" = actor sống cùng đội (gồm bản thân).

| `doi_tuong` | Cách resolve |
|---|---|
| `BAN_THAN` | Luôn là actor đang thực hiện lượt. Không cần `target_actor_id`. |
| `TAT_CA_DICH` | Mọi địch còn sống tại thời điểm áp dụng (tối đa 3). Không cần `target_actor_id`; sát thương/effect tính **riêng từng mục tiêu**. |
| `TAT_CA_DONG_DOI` | Mọi đồng đội còn sống, **gồm cả bản thân**. Không cần `target_actor_id`. |
| `NGAU_NHIEN_N_DICH` | **N cố định = 1**: server tự chọn ngẫu nhiên đúng 1 địch sống, dùng đúng PRNG seed được của trận (mục 1.5.0a) — không dùng `Math.random()`; client gửi `target_actor_id` thừa bị bỏ qua. Kết quả + `rng_state` trước khi gọi được ghi vào `nhat_ky_luot_danh`. |
| `MOT_DICH` | Tập hợp lệ = địch sống. **Còn đúng 1 địch** → server tự resolve, không cần `target_actor_id`. **Còn ≥ 2 địch** → bắt buộc client gửi `target_actor_id` thuộc tập hợp lệ. |
| `MOT_DONG_DOI` | Tập hợp lệ = đồng đội sống (gồm bản thân). **Chỉ còn bản thân** → tự resolve. **Còn ≥ 2** → bắt buộc `target_actor_id` thuộc tập hợp lệ (được phép chọn chính mình). |

**Validate bắt buộc ở server cho mọi `target_actor_id` do client gửi:**
- Tồn tại trong `actors[]` của đúng `tran_dau_id`; còn sống (`hp_hien_tai > 0`).
- Đúng đội theo `doi_tuong` của effect (`MOT_DICH` → đội khác; `MOT_DONG_DOI` → cùng đội).
- Client **không** được truyền danh sách target cho AOE/`TAT_CA_*`/`NGAU_NHIEN_N_DICH`; các effect này server luôn tự resolve, bỏ qua mọi giá trị client gửi.
- Một skill có nhiều effect với `doi_tuong` khác nhau (ví dụ `BAN_THAN` + `MOT_DICH`) chỉ cần **một** `target_actor_id` (cho effect cần chọn 1 mục tiêu ngoài bản thân). v1 không hỗ trợ 1 skill có 2 effect `MOT_DICH`/`MOT_DONG_DOI` nhắm 2 mục tiêu khác nhau — Dev Mode (3.4) chặn lưu skill như vậy.
- Nếu một effect ở giữa chuỗi mất mục tiêu vì mục tiêu đã chết do effect trước đó (AOE, hoặc effect trước giết nó) → effect đó bị bỏ qua, log `bi_bo_qua` (mục 0.8.1.L); `MOT_DICH` không còn địch sống → bỏ qua, log `KHONG_CON_MUC_TIEU`.
- **Không có auto-focus:** engine không bao giờ tự đổi/ép target về actor SPD cao nhất hay actor bất kỳ; người chơi luôn chọn target hợp lệ.

**Read-model `lua_chon_hop_le` (mới v1.8.0, chỉ để hiển thị):** server trả kèm trạng thái trận, cho actor đang tới lượt của người chơi, danh sách từng skill với `dung_duoc` (true/false + lý do: `COOLDOWN`, `THIEU_MP`, `BI_SILENCE`, `BI_ROOT`), `can_chon_target` và mảng `target_hop_le` (actor_id), cùng cờ `co_the_bo_luot`. Dùng MP dự báo sau hồi như bước 4.5c. UI dựa vào đây để highlight target hợp lệ, disable skill/target không hợp lệ, preview phạm vi AOE và ẩn bước chọn target với skill `BAN_THAN`/`TAT_CA_*`. Đây **không** phải nguồn sự thật: server luôn validate lại hành động thật (chỉ có thể báo lỗi khi state đổi ngay trước commit).

### 1.5.4 Lượt đánh của AI (viết lại v1.8.0 — chấm điểm có trọng số, deterministic, nhận biết trạng thái đội)

**Nguyên tắc:** (1) vẫn **deterministic** (cùng state → cùng hành động, không random, dễ test); (2) dùng **đúng primitive `thuc_hien_luot_danh`**, không có engine riêng — skill/target chỉ là input server tự sinh rồi đi qua mọi validate (mục 1.5.3); (3) chỉ dùng thông tin mà UI cũng hiển thị cho người chơi (HP, shield, MP, chỉ số hiện tại, buff/debuff, CC, `khang_cc`) — không đọc skill trang bị hay cooldown của phía đối diện; (4) không dùng machine learning. Heuristic `damage_score` của v1.7.0 bị thay thế vì không phân biệt được target, không hiểu heal/CC/đội, và luôn chọn skill nhiều `he_so` nhất.

**Bước 1 — tập lựa chọn L:** mọi cặp (skill, target) với skill thuộc `ky_nang_trang_bi` của AI actor, `HOAT_DONG`, cooldown = 0, đủ MP, hợp lệ SILENCE/ROOT; skill cần chọn target sinh 1 lựa chọn cho mỗi target hợp lệ, skill không cần target sinh 1 lựa chọn. `L` rỗng → BỎ_LƯỢT (`ly_do` theo 4.5, hoặc `CHU_DONG` nếu chỉ do cooldown).

**Bước 2 — giá trị thô của từng effect** trên mỗi target đã resolve `t` (gọi `ehp(t) = hp_hien_tai + shield_hien_tai`, `hp_pct(t) = hp_hien_tai / hp_toi_da`, `nguy_hiem(t) = (ATK_hien_tai × spd_hien_tai) / MAX trên địch sống của (ATK_hien_tai × spd_hien_tai)` ∈ (0, 1], và `sat_thuong_du_kien` = chính hàm công thức 0.8.1.A/B/C chạy thuần, không ghi state):

| Nhóm | Effect | Giá trị thô (cộng dồn qua mọi target) |
|---|---|---|
| `DMG` | `EFF_DMG_DIRECT/AOE/TRUE` | `MIN(sat_thuong_du_kien, ehp(t)) / ehp(t) × (0.5 + 0.5·nguy_hiem(t))` |
| `DMG` | `EFF_DMG_DOT` | `0.7 × MIN(sat_thuong_moi_luot × so_luot, ehp(t)) / ehp(t) × (0.5 + 0.5·nguy_hiem(t))` |
| `KILL` | các effect sát thương tức thời | `+1 × (0.5 + 0.5·nguy_hiem(t))` nếu `sat_thuong_du_kien ≥ ehp(t)` |
| `CC` | `EFF_STUN` 1.0; `EFF_SILENCE` 0.6; `EFF_ROOT` 0.4; `EFF_SLOW` 0.5 | hệ số × `nguy_hiem(t)`; bằng 0 nếu t đang mang CC khoá hoặc `khang_cc(t) > 0` (với SLOW: nếu đã bị SLOW) |
| `SUP` | `EFF_HEAL`, `EFF_HOT` (×0.7), `EFF_SHIELD` | `MIN(lượng_thực, phần_thiếu) / hp_toi_da(t) × (1 + (1 − hp_pct(t)))`; shield chỉ tính tới trần 50% |
| `SUP` | `EFF_CLEANSE` | `0.3 ×` số effect sẽ gỡ (`KHONG_CHE` tính 2) |
| `MOD` | `EFF_BUFF_*` lên đồng đội; `EFF_DEBUFF_ATK/DEF` lên địch; `EFF_DISPEL` | `0.25` nếu chưa mang; `DEBUFF` nhân thêm `nguy_hiem(t)`; `DISPEL` = `0.25 ×` số buff gỡ được. `EFF_LIFESTEAL` không tính điểm riêng |

**Bước 3 — điểm lựa chọn:** `diem = w_DMG·DMG + w_KILL·KILL + w_CC·CC + w_SUP·SUP + w_MOD·MOD`, với trọng số theo `ai_archetype` của actor:

| Archetype | `w_DMG` | `w_KILL` | `w_CC` | `w_SUP` | `w_MOD` |
|---|---|---|---|---|---|
| `AGGRESSIVE` | 1.0 | 1.5 | 0.4 | 0.3 | 0.3 |
| `CONTROL` | 0.6 | 0.8 | 1.2 | 0.4 | 0.5 |
| `DEFENSIVE` | 0.5 | 0.6 | 0.6 | 1.5 | 0.5 |

`ADAPTIVE` chọn một trong ba bộ trọng số trên mỗi lượt theo **trạng thái đội**, xét lần lượt: (1) có đồng đội sống `hp_pct ≤ 0.35` **và** tồn tại lựa chọn có `SUP > 0` → dùng `DEFENSIVE`; (2) tồn tại lựa chọn có `KILL > 0` → `AGGRESSIVE`; (3) số actor sống của đội AI ít hơn đội kia → `CONTROL`; (4) còn lại → `AGGRESSIVE`.

**Bước 4 — chọn:** lựa chọn có `diem` cao nhất; bằng nhau → skill đứng trước trong `ky_nang_trang_bi`; vẫn bằng → target có `thu_tu_uu_tien` nhỏ hơn. Nếu `diem` cao nhất = 0 (không lựa chọn nào có giá trị, ví dụ chỉ còn heal khi cả đội đầy máu) → BỎ_LƯỢT chủ động để giữ MP.

⚠️ **CẦN DUYỆT:** hệ số/trọng số là giá trị khởi điểm cho v1.8.0, phải hiệu chỉnh bằng Sandbox AI-vs-AI và playtest. AI không lập kế hoạch nhiều lượt và không phối hợp combo có chủ đích — giới hạn được chấp nhận ở v1.8.0 (nâng cấp AI xem 4.4).

### 1.5.5 Xác định kết quả trận đấu (viết lại v1.8.0 cho 3v3)

Kiểm tra **luôn** diễn ra ở bước 11 của `thuc_hien_luot_danh`, tức **sau khi** toàn bộ effect (7b), passive (7c) và DOT/HOT (9) của lượt hiện tại đã xử lý và trạng thái chết đã ghi nguyên tử (mục 0.8.1.L). Chỉ trạng thái sống/chết **cuối cùng** của từng actor quyết định, không phụ thuộc thứ tự effect gây chết bên trong lượt.

Một đội **bị xóa sổ** khi không còn actor nào có `hp_hien_tai > 0`. Một actor chết **không** kết thúc trận.

1. **Đúng một đội bị xóa sổ** → `ket_qua = CO_BEN_THANG`, `actor_ids_thang` = mọi actor (kể cả đã chết) của đội còn lại.
2. **Cả hai đội cùng bị xóa sổ** ở cùng lần kiểm tra → `ket_qua = HOA`, `actor_ids_thang = []`. (Chỉ xảy ra qua DOT/HOT cuối lượt hoặc tổ hợp effect+passive; không effect nào trong registry gây sát thương lên `BAN_THAN`/đồng đội, nên actor thi triển không tự giết cả đội mình bằng skill.) Ưu tiên hòa vì phù hợp gameplay và đối xứng giữa hai đội; không dùng luật tie-break ngẫu nhiên.
3. **Giới hạn hành động (chống trận kéo dài vô hạn):** nếu không đội nào bị xóa sổ và `so_luot ≥ GIOI_HAN_HANH_DONG = 150` (mỗi mutation canonical, kể cả auto-pass, tính 1) → đội có `Σ hp_hien_tai / Σ hp_toi_da` cao hơn thắng (so sánh phân số bằng nhân chéo số nguyên, không dùng số thực); bằng nhau → `HOA`. Hằng số là giá trị khởi điểm, ⚠️ CẦN DUYỆT theo playtest.
4. **Timeout PvP (mục 2.5):** đội của người chơi hết hạn thua; `actor_ids_thang` = mọi actor đội kia.

**Bảo lưu — Co-op 2v1 (không build ở v1.8.0, giữ lại quy tắc cũ để không mất thiết kế):** đội AI chết → người chơi thắng (kể cả khi người còn lại đã chết); cả hai người chơi chết → AI thắng; AI và toàn bộ người chơi cùng chết ở một lần kiểm tra → mặc định người chơi thắng (kiểm điều kiện "AI chết" trước) ⚠️ CẦN DUYỆT khi Co-op được mở lại.

### 1.5.6 Tổng kết sau trận (P1, mới v1.8.0)

Hàm đọc `lay_tong_ket_tran(tran_dau_id)` tính hoàn toàn từ `nhat_ky_luot_danh` + snapshot (không thêm bảng, không thêm tiến trình). Hiển thị: Thắng/Thua/Hòa; số lượt (`so_luot`) và thời gian; theo từng actor (gắn đội và tên): sát thương gây ra, hồi máu, khiên tạo ra, số lần passive kích hoạt, số lần gây CC, sống/chết; danh sách skill đã dùng. Không có thuật toán "Key Moment" ở v1.8.0 (đưa vào roadmap).

---

## 1.6 Chế độ PvE

**Cả hai chế độ PvE dùng đội người chơi 1–3 nhân vật (mục 1.4, không bắt buộc đúng 3) đấu đội AI 1–3 actor.**

### 1.6.1 Đối kháng (vs AI)
Một trận độc lập, không thuộc `man_choi`. Đội AI cố định theo dữ liệu seed (1–3 actor, không bắt buộc đúng 3 — xem mục 1.7), cùng cấu trúc `doi_ai[]` (mục 0.7.12): mỗi actor gồm Class, skill, `phan_bo_diem`, `ai_archetype`. Đội AI phải có thành phần hợp lý (không cần role cứng) để trận có counterplay.

### 1.6.2 Đi ải
- Danh sách `man_choi` hiển thị theo `thu_tu`; mỗi màn dùng `cau_hinh_ai.doi_ai[]` riêng (1–3 actor). Độ khó tăng dần bằng: số actor AI, Class/Passive/skill, `phan_bo_diem` và `ai_archetype` — **không** thêm procedural dungeon hay effect mới ở v1.8.0.
- Thắng một màn → đánh dấu đã hoàn thành (bảng `tien_do_di_ai`, khoá ghép `nguoi_choi_id` × `man_choi_id`). Hòa hoặc thua không tính hoàn thành và không mất tiến độ các màn trước.

---

## 1.7 Dữ liệu seed bắt buộc cho Phần 1

- Toàn bộ 19 hiệu ứng ở mục 0.8.
- Tối thiểu **4 Class `THUONG`** khác biệt rõ về lối chơi (design intent: pressure, control, sustain/protection, burst/tempo — không phải role bắt buộc), **`spd_nen` khác nhau nhưng tỉ lệ max/min ≤ 2.0**, khuyến nghị thang chỉ số ở mục 0.7.3; **mỗi Class có đúng 1 nội tại** (chỉ dùng `doi_tuong` hợp lệ theo 0.7.4) làm rõ bản sắc.
- Mỗi Class tối thiểu **6 skill** (để người chơi chọn 4/6, tạo loadout khác nhau trong cùng một Class), mỗi skill dùng tổ hợp khác nhau từ 19 hiệu ứng, có `chi_phi_mp` khác 0 ở nhiều skill để kiểm chứng MP.
- Bộ skill phải bao phủ công cụ counterplay ở 0.13.2: ít nhất 2 Class có skill nhắm đồng đội (`HEAL`/`SHIELD`/`BUFF` với `MOT_DONG_DOI` hoặc `TAT_CA_DONG_DOI`), ít nhất 2 Class có `EFF_CLEANSE`, ít nhất 2 Class có CC khoá hợp lệ (0.8.5), ít nhất 2 Class có skill sát thương diện rộng.
- **Khuyến nghị (mềm, không chặn lưu):** mỗi Class nên có **ít nhất 1 skill với `hoi_chieu_luot = 0` và `chi_phi_mp = 0`** — không phải một cơ chế "đánh thường" mới, chỉ là một skill bình thường chi phí bằng 0 — giảm tần suất dead-turn (mục 4.7, Agency risk). Dev Mode cảnh báo mềm nếu thiếu, không chặn lưu. Đo bằng `Forced Pass Rate` (mục 0.14).
- Tối thiểu **3 màn** trong `man_choi` với độ khó tăng dần, và 1 đội AI Đối kháng; toàn bộ đội AI phải dùng ít nhất 3 `ai_archetype` khác nhau. Mọi đội AI qua cùng validator với nhân vật người chơi.
- Bộ ngoại hình tối thiểu để tạo được ít nhất 1 nhân vật hoàn chỉnh mỗi giới tính (đủ tóc/mặt/áo/quần cho Nam và Nữ, tối thiểu 2 lựa chọn mỗi danh mục), và tối thiểu 3 `mau_da_preset`.
- **`cau_hinh_he_thong`** (mục 0.7.13b) seed đúng giá trị ở mục 0.8.6.F và cấu hình Triệu Hồi Khởi Đầu.
- Tối thiểu **4 Class `LINH_THAN`** (`phan_loai = LINH_THAN`, `tier = SSS`), mỗi Linh Thần ≥ 4 skill, đúng 1 nội tại, tên/ngoại hình cố định — theo bảng minh hoạ bên dưới.
- Mỗi `man_choi` seed đúng `huong_hoa_first_clear` theo bảng số liệu ở mục 0.8.6.F (100/màn × 3 màn = 300).

### Tách bạch tên gọi (đóng ambiguity "Class vs Linh Thần" — bắt buộc đọc trước khi seed)

**`Class` (archetype, `phan_loai = THUONG`)** và **`Linh Thần` (character cụ thể, `phan_loai = LINH_THAN`, tier `SSS`)** là hai khái niệm dữ liệu tách biệt hoàn toàn (mục 0.7.3) và **không được dùng chung một tên hiển thị**: 4 Class minh hoạ dưới đặt tên theo **hệ phái** (không phải tên riêng); 4 Linh Thần minh hoạ đặt tên theo **nhân vật cổ tích cụ thể**. Một nhân vật `THUONG` mang tên "Hệ Pháp Sư" không phải và không liên quan tới Linh Thần "Thánh Gióng" — trùng hợp thẩm mỹ (cùng chủ đề Việt Nam) không tạo quan hệ dữ liệu nào.

**Ví dụ minh hoạ 4 Class `THUONG` (bản sắc, không phải yêu cầu cứng — Dev Mode toàn quyền đổi tên/số liệu, chỉ giữ đúng cấu trúc dữ liệu ở mục 0.7.3-0.7.6):**

| Class | Design intent | Nội tại (trigger) | Skill minh hoạ | Counterplay coverage |
|---|---|---|---|---|
| **Hệ Hộ Vệ** | Control/Tempo | `BAT_DAU_TRAN`: tự nhận `EFF_SHIELD` (~40% HP tối đa) | "Khiên Chắn": `EFF_DMG_AOE` + `EFF_SLOW` diện rộng | AOE |
| **Hệ Dũng Sĩ** | Burst | — | "Trảm Long": `EFF_DMG_TRUE` đơn mục tiêu, hệ số cao; "Hồi Sức Chiến Binh": `EFF_HOT` cho đồng đội | Heal/HOT cho đồng đội |
| **Hệ Pháp Sư** | Pressure | `KHI_GAY_SAT_THUONG`: tự áp thêm `EFF_DMG_DOT` lên mục tiêu vừa trúng đòn | "Phong Ấn": `EFF_STUN` đơn mục tiêu | CC khoá (STUN) |
| **Hệ Thần Y** | Sustain/Protection | `BAT_DAU_LUOT`: hồi thêm MP cho bản thân khi HP đồng đội thấp | "Y Thuật Thần Kỳ": `EFF_SHIELD`/`EFF_HEAL` cho `TAT_CA_DONG_DOI`; "Giải Độc": `EFF_CLEANSE` | Shield/Heal diện rộng, Cleanse |

Bảng trên minh hoạ đúng 4 design intent bắt buộc và phần lớn hạng mục counterplay ở 0.13.2 — Dev Mode cần bổ sung thêm skill (trong tổng 6 skill/Class) để đạt đủ **≥ 2 Class/mỗi hạng mục**, bảng chỉ minh hoạ bản sắc, không phải bộ skill đầy đủ cuối cùng.

### Hero preset Việt Nam — seed MVP bắt buộc (20 Hero, B→SS)

> Đây là **nội dung preset**, không phải 20 Class hệ phái chung. Mỗi dòng tương ứng một `class` `THUONG`, `la_hero_preset=true`, tier cố định. Các Hero được lấy từ nhân vật có tên rõ trong cổ tích/truyền thuyết Việt Nam; Dev Mode tạo skill bằng đúng 19 effect hiện có.

| Tier | Hero | Chất liệu | Bản sắc chiến đấu gợi ý |
|---|---|---|---|
| B | Sọ Dừa | Cổ tích Sọ Dừa | sustain / tự hồi phục |
| B | Mai An Tiêm | Sự tích Mai An Tiêm | cấu rỉa / DOT |
| B | Lang Liêu | Truyền thuyết Bánh chưng Bánh dày | shield / hỗ trợ |
| B | Tấm | Cổ tích Tấm Cám | heal / cleanse |
| B | Anh Khoai | Cổ tích Cây tre trăm đốt | control / tiện ích |
| A | Tiên Dung | Truyền thuyết Chử Đồng Tử | heal / cleanse |
| A | Mỵ Châu | Truyền thuyết An Dương Vương | SPD / buff |
| A | Trọng Thủy | Truyền thuyết An Dương Vương | debuff / control |
| A | Vua Hùng thứ 18 | Truyền thuyết Sơn Tinh–Thủy Tinh | tank / team support |
| A | Cô Út | Cổ tích Sọ Dừa | sustain / tempo |
| S | Thủy Tinh | Truyền thuyết Sơn Tinh–Thủy Tinh | AOE / slow |
| S | An Dương Vương | Truyền thuyết nỏ thần | burst / true damage |
| S | Lạc Long Quân | Truyền thuyết Con Rồng Cháu Tiên | frontline / AOE |
| S | Âu Cơ | Truyền thuyết Con Rồng Cháu Tiên | sustain / shield |
| S | Trưng Trắc | Truyền thuyết dân gian về Hai Bà Trưng | tempo / team buff |
| SS | Trưng Nhị | Truyền thuyết dân gian về Hai Bà Trưng | burst / counter |
| SS | Bà Triệu | Truyền thuyết dân gian về Bà Triệu | burst / anti-CC |
| SS | Vua Hùng | Truyền thuyết các Vua Hùng | tank / protection |
| SS | Chàng Cóc | Truyện dân gian Cóc kiện Trời | control / utility |
| SS | Chàng Tí Hon | Truyện dân gian Chàng Tí Hon | tempo / single-target pressure |

**Quy tắc seed:** 20 Hero trên phải có `ma_class` duy nhất, `la_hero_preset=true`, tier cố định đúng bảng, tối thiểu 6 skill/Class, đúng 1 passive, và không được trùng với 4 Linh Thần SSS. Nếu một tên/nguồn được đội nội dung xác định là không đủ rõ về nguồn dân gian trong quá trình triển khai, thay bằng một nhân vật dân gian có tên rõ ràng nhưng **không đổi tier-count 5/5/5/5**.

**Ví dụ minh hoạ 4 Linh Thần `SSS` (Bách Thần Điện, mục 0.8.6.B/1.4b):**

| Linh Thần | Design intent | Nội tại (trigger) | Skill minh hoạ | Đặc trưng riêng (`dac_trung_rieng=true`, mục 0.8.4.G) |
|---|---|---|---|---|
| **Sơn Tinh** | Control diện rộng | `BAT_DAU_TRAN`: tự nhận `EFF_SHIELD` lớn | "Dời Non Lấp Bể": `EFF_DMG_AOE` + `EFF_STUN` (đơn mục tiêu trong nhóm trúng AOE, tuân `EFF_STUN` phải `MOT_DICH`/`NGAU_NHIEN_N_DICH` theo 0.8.5.5) | Skill "Dời Non Lấp Bể" — AOE **kèm** STUN trong cùng 1 skill là tổ hợp không Class `THUONG` nào seed (nhóm `SAT_THUONG` diện rộng + `KHONG_CHE` khoá cùng lúc) |
| **Thạch Sanh** | Burst tối đa | — | "Niêu Cơm Thần": `EFF_HOT` toàn đội; "Chém Xà Tinh": `EFF_DMG_TRUE` hệ số rất cao | Skill "Niêu Cơm Thần" — `EFF_HOT` nhắm `TAT_CA_DONG_DOI` (không chỉ 1 đồng đội) chưa Class `THUONG` nào seed có |
| **Thánh Gióng** | Pressure/Tempo | `KHI_GAY_SAT_THUONG`: tự cộng thêm `EFF_BUFF_SPD` cho bản thân | "Roi Sắt": `EFF_DMG_DIRECT` + `EFF_SILENCE` | Nội tại "Ngựa Sắt Phi Phong" — tích luỹ SPD mỗi lần gây sát thương là vòng lặp tempo riêng, không Class `THUONG` nào có Nội tại cùng cơ chế |
| **Chử Đồng Tử** | Sustain/Utility | `BAT_DAU_LUOT`: `EFF_CLEANSE` miễn phí cho đồng đội HP thấp nhất | "Nón Tiên": `EFF_SHIELD` + `EFF_DISPEL` diện rộng | Skill "Nón Tiên" — `EFF_SHIELD` **kèm** `EFF_DISPEL` diện rộng trong cùng 1 skill, tổ hợp hỗ trợ + phản-buff chưa Class `THUONG` nào seed |

Mỗi Linh Thần ở bảng trên có **ít nhất 1** cột cuối đánh dấu rõ lý do đạt điều kiện Layer 2 bắt buộc (mục 0.8.4.G) — khi Dev Mode seed thật, field tương ứng (`ky_nang.dac_trung_rieng` hoặc `noi_tai_class.dac_trung_rieng`) phải đặt `true` đúng ở phần tử được chỉ ra. Chỉ cần seed đủ **1 Linh Thần hoạt động** để Bách Thần Điện có nội dung test ở v2.1.0; seed đủ 4 nếu có thời gian, còn lại vẫn hợp lệ ở trạng thái dữ liệu (`HOAT_DONG`) chờ mở dần theo nguồn Hương Hỏa tương lai (mục 0.8.6.H).

---


## 1.8 Tiêu chí nghiệm thu Phần 1

- [ ] Màn Menu chính là route riêng biệt, không lẫn với màn Chọn đội hình ra trận hay Kho nhân vật.
- [ ] Tạo được nhân vật mới hoàn chỉnh qua đúng 5 bước + màn xem lại (Class → Tên → Phân bổ 5 điểm → Ngoại hình → Skill), xem trước ngoại hình cập nhật theo thời gian thực, preview `Base → Final` đúng khi cộng/trừ điểm.
- [ ] Không lưu được nhân vật nếu chưa chọn skill nào hoặc chọn quá 4 skill.
- [ ] Chơi trọn 1 trận PvE Đối kháng (đội hình 1, 2 hoặc 3 nhân vật đều thử) từ đầu đến khi có kết quả thắng/thua/hòa, không cần can thiệp thủ công; người chơi có 0 nhân vật không vào được trận và được dẫn tới tạo nhân vật.
- [ ] Chơi trọn chuỗi Đi ải tối thiểu 3 màn, tiến độ được lưu đúng giữa các lần chơi.
- [ ] Một skill có từ 2 hiệu ứng trở lên áp dụng đúng thứ tự cấu hình, kiểm tra được qua `nhat_ky_luot_danh`.
- [ ] Skill đang hồi chiêu không dùng lại được; kiểm thử `hoi_chieu_luot = 0, 1, 2` theo đúng quy ước.
- [ ] DOT/HOT kích hoạt đúng thời điểm, đúng số lần, không bị cộng/trừ thêm một lần.
- [ ] Reload/reconnect giữa trận không làm reset trạng thái combat (bao gồm cả `thanh_tich_luy`/gauge ATB và `mp_hien_tai`).
- [ ] Gửi trực tiếp một lượt đánh trái lượt (không phải lượt của mình) qua API → bị từ chối, không có ngoại lệ nào lọt qua do chỉ kiểm tra ở giao diện.
- [ ] Xếp actor SPD cao (tỉ lệ ≥ 2:1) cạnh actor SPD thấp: actor nhanh được đi 2 lượt liên tiếp (đúng trần `TRAN_LUOT_ACTOR`) trước khi actor chậm có lượt đầu tiên, đúng theo công thức ATB mục 1.5.0.
- [ ] Buff `EFF_BUFF_SPD` / debuff `EFF_SLOW` làm thay đổi ngay tần suất actor đó được tới lượt trong các lượt kế tiếp.
- [ ] Tạo nhân vật mới → phải nhập tên hợp lệ 1–24 ký tự Unicode; tên được lưu và hiển thị đúng ở Kho nhân vật, màn Chọn nhân vật và snapshot/UI phù hợp.
- [ ] Tên rỗng sau trim, dài >24 ký tự hoặc chứa ký tự điều khiển → server từ chối; không tạo nhân vật một phần.
- [ ] Dùng skill có `chi_phi_mp` lớn hơn `mp_hien_tai` hiện tại → bị từ chối ở server; MP hồi đúng `mp_hoi_moi_luot` mỗi khi đến lượt actor, không vượt `mp_toi_da`.
- [ ] Sau khi hồi MP, nếu mọi skill đang sẵn sàng về cooldown nhưng **không skill nào đủ MP** → server tự BỎ_LƯỢT với lý do `KHONG_DU_MP`, không chờ input/timeout; lượt vẫn giảm cooldown đúng 1 và không trừ MP.
- [ ] Nếu có ít nhất một skill đủ MP → không được auto-pass chỉ vì một số skill khác thiếu MP; client vẫn được chọn skill hợp lệ.
- [ ] `EFF_DMG_DIRECT`/`EFF_DMG_AOE` tính đúng công thức mục 0.8.1.A (`ATK × he_so × 100/(100+DEF)`, sàn tối thiểu 1); `EFF_DMG_TRUE` bỏ qua DEF hoàn toàn, khớp mục 0.8.1.B.
- [ ] `EFF_STUN`: actor bị stun vẫn được ATB chọn tới lượt nhưng tự động BỎ_LƯỢT, không tốn MP, cooldown skill của actor vẫn giảm đúng theo mục 0.8.1.E.
- [ ] `EFF_SILENCE`: actor không dùng được skill có effect nhóm `HOI_PHUC`/`BUFF`/`TIEN_ICH` trong lúc bị silence, vẫn dùng được skill thuần sát thương/debuff, đúng mục 0.8.1.F.
- [ ] `EFF_ROOT`: actor chỉ dùng được skill toàn bộ effect nhắm `BAN_THAN` hoặc BỎ_LƯỢT trong lúc bị root, đúng mục 0.8.1.G.
- [ ] Cast `EFF_SHIELD` khi đã có shield → cộng dồn đúng, không replace; cast lại buff/debuff/DOT/HOT cùng mã trong lúc effect cũ chưa hết → refresh thời lượng, không cộng dồn giá trị, đúng mục 0.8.1.I/K.
- [ ] `EFF_CLEANSE`/`EFF_DISPEL` với `so_luong_go` nhỏ hơn số effect hiện có → gỡ đúng thứ tự FIFO (effect áp dụng sớm nhất bị gỡ trước), đúng mục 0.8.1.J.
- [ ] **(v1.8.0)** Toàn bộ tiêu chí P0 ở mục 0.15 (Team, ATB/SPD, Target, Stat Allocation, Passive, CC, MP/Agency, Focus fire, Snapshot/Reconnect/Concurrency, AI, Sandbox) đều đạt.

---

# PHẦN 2 — PvP

> Phụ thuộc Phần 0 và Phần 1. Bắt buộc tái sử dụng nguyên vẹn Shared Combat Engine ở mục 1.5 — không viết engine combat thứ hai.
>
> **Runtime: Online Runtime (mục 0.2).** Toàn bộ Phần 2 luôn cần Internet — không có chế độ offline cho PvP. Shared Combat Engine chạy ở tầng **application/server runtime** (Edge Function/backend), sau đó application ghi kết quả xuống PostgreSQL trong 1 transaction/lượt — PostgreSQL chỉ làm persistence, không host engine (mục 0.2). Khác Phần 1 chỉ ở **nơi gọi engine (in-process vs application/server runtime) và nơi lưu trạng thái (local storage vs PostgreSQL)**, không khác ở luật combat.

## 2.1 Ghép phòng bằng mã phòng

Thay thế hoàn toàn ý tưởng "ghép phòng bằng IP" — không khả thi trên nền web, đổi sang cơ chế mã phòng.

| Hành động | Luồng |
|---|---|
| Tạo phòng | Người chơi chọn `che_do` (**Đối kháng**, đội hình 1–3 mỗi bên; `Đi ải cùng nhau` bị khoá ở v1.8.0 — mục 2.4.2) và **`che_do_tier`** (`Cân bằng` mặc định / `Tự do` — mục 0.7.11, giải thích ngắn ngay trong UI: "Tự do: hệ số Tier áp dụng đầy đủ, Linh Thần mạnh hơn nhân vật thường") → tạo bản ghi `phong_choi`, sinh `ma_phong` ngẫu nhiên, dễ đọc (6 ký tự chữ+số, phân biệt hoa/thường không quan trọng để tránh nhầm lẫn khi đọc/gõ) → trạng thái `CHO_NGUOI_CHOI_2` → hiển thị mã kèm luật tier cho người chơi chia sẻ |
| Tham gia phòng | Người chơi nhập `ma_phong` → nếu phòng tồn tại và đang `CHO_NGUOI_CHOI_2` → gán `nguoi_choi_2_id`, chuyển trạng thái `SAN_SANG`. Client hiển thị `che_do_tier` của phòng **trước** khi người chơi vào màn Chọn đội hình |
| Sẵn sàng vào trận | Cả hai người chơi đều xác nhận **Chọn đội hình ra trận** (mục 2.2; lưu vào `doi_hinh_nguoi_tao`/`doi_hinh_nguoi_2`) → chuyển trạng thái `DANG_CHOI`, khởi tạo `tran_dau` bằng đúng hàm `bat_dau_tran` ở mục 1.5.2. Đội của `nguoi_tao_id` (người tạo phòng) là `DOI_A`; `thu_tu_uu_tien` (đan xen A1, B1, A2, B2, A3, B3) chỉ có ý nghĩa **tie-break khi gauge ATB bằng nhau tuyệt đối** (xem mục 1.5.0), không phải luật "đi trước" độc lập: bên SPD cao hơn vẫn luôn được đi trước bất kể ai tạo phòng |
| Huỷ phòng | Người tạo phòng có thể huỷ khi còn ở trạng thái `CHO_NGUOI_CHOI_2` → chuyển `DA_HUY` |

## 2.2 Chọn đội hình ra trận (PvP) — gửi bản khai nhân vật, không gửi tham chiếu

Server (Online Runtime) **không có quyền truy cập** `nhan_vat` (local-only, mục 0.7.10) — nên với PvP, client không gửi `nhan_vat_id` để server tự tra, mà gửi nguyên **bản khai** (`nhan_vat_payload`) cho từng vị trí:

```json
{
  "nhan_vat_id_local": "uuid-tren-thiet-bi (chỉ để hiển thị/log, KHÔNG dùng để tra cứu)",
  "class_id": "uuid",
  "tier": "B | A | S | SS | SSS",
  "ten_hien_thi": "text, 1-24 ky tu",
  "ky_nang_trang_bi": ["uuid", "..."],
  "diem_hp": 0, "diem_atk": 0, "diem_def": 0, "diem_spd": 0, "diem_mp": 0, "diem_mp_hoi": 0,
  "ngoai_hinh": { "gioi_tinh": "NAM|NU", "mau_da_id": "uuid", "toc_id": "uuid", "mat_id": "uuid", "ao_id": "uuid", "quan_id": "uuid", "trang_suc_id": "uuid | null" }
}
```

**Server validate từng bản khai (từ chối toàn bộ đội hình nếu 1 bản khai sai — không "sửa hộ"):**
1. `class_id` tồn tại, `trang_thai = HOAT_DONG`.
2. Nếu `class.phan_loai = LINH_THAN` → `tier` bắt buộc `SSS`. Nếu `class.phan_loai = THUONG` + `class.la_hero_preset=true` → `tier` phải đúng tier seed `B/A/S/SS` của Hero. Nếu `class.phan_loai = THUONG` + `la_hero_preset=false` → `tier ∈ {B,A,S}`. Sai cặp này → từ chối.
3. `ky_nang_trang_bi`: 1–4 phần tử, phân biệt, mỗi id thuộc đúng `class_id` và `HOAT_DONG`.
4. `diem_*`: mỗi giá trị 0–2, tổng đúng 5.
5. `ngoai_hinh.*_id`: mỗi id (trừ `trang_suc_id` có thể null) tồn tại trong `ngoai_hinh_asset`/`mau_da_preset` và tương thích `gioi_tinh`. Với `tier = SSS`, server **ghi đè** toàn bộ `ngoai_hinh`/`ten_hien_thi` bằng `class.ngoai_hinh_co_dinh`/`class.ten_co_dinh` — client gửi gì cũng không đổi hiển thị của Linh Thần (chống giả mạo ngoại hình/tên của thực thể có kit mạnh).
6. Không có `nhan_vat_id_local` nào trùng nhau **trong cùng một đội hình** (khác đội hình được phép trùng — không có ý nghĩa gì với server, chỉ là nhãn của client).
7. Đếm số bản khai `tier = SSS` trong đội hình ≤ `so_linh_than_toi_da_moi_doi` (mục 0.7.13b).

Qua hết 7 bước, server tự tính `chi_so_cuoi` bằng `tinh_chi_so_cuoi` (mục 0.8.4) từ **chỉ số nền của server** (không tin bất kỳ con số chỉ số nào client gửi kèm, dù có) + `che_do_tier` của phòng — đúng nguyên tắc "client không quyết định chỉ số" (mục 0.3 #6) dù không có bảng nhân vật phía server.

Sau khi cả hai bản khai hợp lệ, lưu vào `doi_hinh_nguoi_tao`/`doi_hinh_nguoi_2` (mục 0.7.11) và gọi `bat_dau_tran` (mục 1.5.2). **Hai người chơi không bắt buộc chọn cùng số lượng** — 1v1, 1v3, 2v3... đều hợp lệ. Đây là ghép trận theo phòng 1 người/đội — **không có party matchmaking** ở v1.8.0 (roadmap, mục 4.4). Đối thủ không thấy đội hình của bạn cho tới khi trận bắt đầu.

**Không xác thực quyền sở hữu (ADR-08):** server không kiểm tra người chơi có thực sự "kiếm" được nhân vật/tier/Linh Thần này ở local hay không — chỉ kiểm tra 7 điều trên. Với phòng `TU_DO`, một người tự sửa local để có Linh Thần chưa mở đúng luật vẫn chơi được; đây là giới hạn đã chấp nhận ở mục 0.1b/0.8.6.H, không phải lỗi.


## 2.3 Đồng bộ thời gian thực

- Dùng Supabase Realtime channel theo `phong_choi.id` (hoặc `tran_dau.id` sau khi trận bắt đầu).
- Mọi thay đổi trạng thái phòng (người tham gia mới, sẵn sàng, trận bắt đầu) và mọi lượt đánh (kết quả trả về từ `thuc_hien_luot_danh`) đều phát lên channel để **cả hai người chơi nhận cùng một trạng thái, cùng lúc**.
- Client không tự tính toán kết quả lượt đánh để hiển thị tạm thời rồi chờ server xác nhận (không dùng optimistic update cho kết quả combat). Chờ kết quả thật từ server rồi mới cập nhật giao diện.
- Client phải unsubscribe/cleanup Realtime channel khi rời phòng, trận kết thúc, component unmount hoặc chuyển màn; không tạo subscription trùng lặp khi reconnect. Sau reconnect, client phải lấy lại snapshot trạng thái chuẩn từ server trước khi tiếp tục nhận event.
- **Chống áp event cũ sau reconnect** (đóng blocker #11 của audit v1.5): `so_luot` trong `trang_thai_chien_dau` (mục 1.5.1) đóng vai trò version đơn điệu tăng của trận — mỗi lần `thuc_hien_luot_danh` commit thành công, `so_luot` tăng. Quy tắc bắt buộc: **client chỉ áp dụng một event Realtime nếu `so_luot` của event đó lớn hơn `so_luot` hiện tại của client; snapshot lấy khi reconnect luôn là trạng thái chuẩn (canonical), ghi đè mọi thứ client có trước đó.** Ví dụ: client nhận event `so_luot=10`, mất mạng, reconnect và lấy snapshot `so_luot=12`, sau đó event cũ `so_luot=11` đến muộn → client bỏ qua event đó vì `11 < 12`.
- **Bất biến version bắt buộc cho MỌI mutation canonical** (mới ở v1.6.1, đóng blocker P0-3): không chỉ lượt đánh bình thường, mà cả lượt auto-pass STUN/SILENCE, lượt AI (mỗi lượt trong chuỗi auto-resolve ở mục 1.5.3 bước 15 là một transaction DB **riêng biệt**, không chia sẻ transaction với lượt trước hay lượt sau), và **TIMEOUT resolution** (mục 2.5) đều phải tăng `so_luot` đúng 1 trong transaction của chính mutation đó — `so_luot` dùng thống nhất làm version cho toàn bộ các loại mutation này, không có mutation nào "vô hình" với version. Không thêm field `combat_version` riêng ở v1.6.1 (giữ scope tối thiểu); nếu về sau cần tách version khỏi ý nghĩa "số lượt", đó là thay đổi schema riêng, không tự làm ngầm. Hệ quả trực tiếp: event `KET_THUC` phát ra do TIMEOUT resolve vẫn phải mang `so_luot` lớn hơn version hiện tại của trận trước khi resolve, để client không bao giờ bỏ qua event kết thúc trận vì tưởng nhầm là event cũ.
- **Contract canonical-state + gap-resync (chốt ở v1.8.1, đóng mơ hồ của v1.8.0 — vẫn dùng đúng `so_luot`, không thêm biến version mới):** mỗi event Realtime phát ra phải mang **toàn bộ canonical combat state** tương ứng chính xác với giá trị `so_luot` của event đó (không phát một "diff"/"delta" rời khỏi state đầy đủ) — payload hiện có của `thuc_hien_luot_danh` (trạng thái `trang_thai_chien_dau` đầy đủ sau khi COMMIT) đã thoả điều kiện này, nên không cần đổi cấu trúc payload, chỉ chốt tường minh đây là hợp đồng bắt buộc. Client áp dụng đúng quy tắc đã có ở trên (chỉ nhận event có `so_luot` lớn hơn state hiện tại), và bổ sung: **nếu `so_luot` của event mới đến lớn hơn version client đang có nhiều hơn 1** (tức có khoảng trống version — ví dụ client đang ở `so_luot=10`, event tiếp theo nhận được là `so_luot=13`, thiếu `11` và `12`), client **không được tự suy diễn** state ở giữa (không nội suy, không ước lượng) — client phải bỏ qua việc áp event đó trực tiếp và **resync bằng cách lấy lại canonical snapshot từ server** (cùng cơ chế đã có sẵn ở bước reconnect phía trên), sau đó tiếp tục nhận event từ đúng `so_luot` vừa lấy được. Quy tắc này áp dụng bất kể lý do gây ra khoảng trống (mất gói tin, throttle, nhiều event dồn trong chuỗi auto-resolve ở bước 15...).

## 2.4 Hai chế độ PvP

### 2.4.1 Đối kháng
2 người chơi trong phòng đấu bằng chính engine ở mục 1.5: mỗi người điều khiển 1–3 actor của đội mình (theo đội hình đã chọn ở mục 2.2, không bắt buộc đúng 3; hai đội không cần bằng số lượng). Thứ tự lượt do ATB quyết định như mọi trận khác (mục 1.5.0), **không có "luân phiên cố định"** — actor SPD cao có thể đi trước, nhưng chịu trần lượt liên tiếp (actor ≤ 2, đội ≤ 3): trần này ngăn đội đang có lợi thế lượt thực hiện action thứ 4 liên tiếp **nếu** đội đối phương còn ít nhất một actor sống và đủ điều kiện được ATB chọn — trần không đảm bảo tuyệt đối rằng đội đối phương chắc chắn sống đủ lâu để hành động (xem ghi chú ở mục 0.13.2). Server chờ đúng người chơi sở hữu actor đang được ATB chọn gửi hành động (skill + `target_actor_id` nếu cần, hoặc BỎ_LƯỢT); gửi hành động cho actor thuộc đội đối phương bị từ chối. Ngoại lệ duy nhất: actor thuộc diện auto-pass (`BI_STUN`, `BI_SILENCE`, `KHONG_DU_MP`) — server tự sinh BỎ_LƯỢT ngay mà không chờ client (mục 1.5.3 bước 4.5 và vòng auto-resolve bước 15, mỗi lần là một transaction DB riêng). Kết quả theo mục 1.5.5: đội bị xóa sổ thua, cùng bị xóa sổ → hòa.

### 2.4.2 Đi ải cùng nhau — BẢO LƯU (không build ở v1.8.0)

> **BẢO LƯU:** thiết kế Co-op gốc là 2 người × 1 nhân vật đấu 1 AI. Ở v1.8.0 `man_choi` đã chuyển sang đội AI 1–3 actor và mỗi người chơi có thể mang đội 1–3 nhân vật, nên Co-op cần thiết kế lại phần phân chia điều khiển actor giữa hai người, timeout theo người và UI — nếu nhồi vào combat theo đội sẽ làm phình scope. Vì vậy: server từ chối tạo phòng `DI_AI_CUNG_NHAU` và từ chối `bat_dau_tran` loại `PVP_DI_AI_CUNG_NHAU`; UI hiển thị "Sắp ra mắt". Nội dung dưới đây giữ nguyên làm tài liệu tham chiếu (đọc `phe` là `doi`/`dieu_khien` theo mục 1.5.1) và **không nghiệm thu ở v1.8.0**. Engine `actors[]` đã tổng quát cho số actor khác nhau mỗi đội nên không cần sửa kiến trúc khi mở lại.
2 người chơi cùng đối đầu với một `man_choi` (giống cấu hình AI đã seed ở mục 1.7). Trận có 3 actor: nhân vật người chơi A, nhân vật người chơi B, AI đối thủ — cả 3 đều tham gia tính gauge ATB như mô tả ở mục 1.5.0 (không có thứ tự cố định A → B → AI; actor nào SPD cao hơn có thể được đi nhiều lượt liên tiếp).

**Luật thắng/thua Co-op:**
- Nếu một trong hai nhân vật người chơi có HP ≤ 0: actor đó bị loại khỏi ATB (không còn được tới lượt, không thể bị AI nhắm mục tiêu), nhưng **trận vẫn tiếp tục** với actor còn lại.
- Trận kết thúc `ket_qua = CO_BEN_THANG`, `actor_ids_thang` = **cả hai actor_id người chơi** (kể cả người đã chết trước đó trong trận) khi AI có HP ≤ 0 (bất kể một hay cả hai người chơi vẫn còn sống lúc đó).
- Trận kết thúc `ket_qua = CO_BEN_THANG`, `actor_ids_thang` = **actor_id của AI** khi cả hai nhân vật người chơi đều có HP ≤ 0.
- AI chọn mục tiêu theo quy tắc ở mục 1.5.4 khi còn nhiều hơn 1 người chơi sống.

## 2.5 Xử lý ngắt kết nối / rời trận

Cần xử lý bằng **deadline server-side 90 giây/lượt** (`han_luot_luc`). Nếu hết deadline mà bên đang có lượt chưa gửi hành động hợp lệ, server tự động xử thua bên đó, kết thúc trận và ghi lý do TIMEOUT vào log. Client chỉ hiển thị đồng hồ; không được tự kết thúc trận. Reconnect trước deadline được tiếp tục dựa trên trạng thái server. **v1.8.0:** deadline áp dụng cho từng actor tới lượt; hết hạn thì **đội của người chơi đó** thua (`actor_ids_thang` = mọi actor đội kia). Mỗi người điều khiển 1–3 actor (theo đội hình đã chọn) nên có thể có nhiều lượt mỗi vòng nếu đội hình >1, mỗi lượt có deadline riêng 90 giây.

**Chốt cơ chế "server tự động" (đóng blocker #10 của audit v1.5):** ATB v1 không chạy theo đồng hồ thực (mục 1.5.0) và không có request nào tự động chạy liên tục, nên "tự động" ở đây không có nghĩa server ngồi đếm ngược theo thời gian thực. Bất biến bắt buộc:

> Bất kỳ request đọc trạng thái hoặc gửi hành động nào chạm tới một trận PvP đã quá `han_luot_luc` phải kiểm tra deadline và resolve TIMEOUT (kết thúc trận, ghi `ket_qua`/`actor_ids_thang`/log) **trước khi** trả về trạng thái hoặc chấp nhận hành động mới — không cần một tiến trình nền chạy độc lập, việc "chạm vào" trận đã đủ để trigger resolve.

**Version khi TIMEOUT (mới ở v1.6.1, đóng blocker P0-3):** việc resolve TIMEOUT là một mutation canonical của trận giống mọi lượt đánh khác — trong cùng transaction ghi `trang_thai = KET_THUC`/`ket_qua`/`actor_ids_thang`/log, server **phải** tăng `so_luot` đúng 1 (cùng invariant ở mục 2.3). Nếu không tăng, một client đang giữ `so_luot` bằng đúng giá trị hiện tại của trận (ví dụ vừa nhận event lượt cuối cùng trước khi hết hạn) sẽ bỏ qua event `KET_THUC` do TIMEOUT vì `so_luot` event không lớn hơn `so_luot` của client — trận kết thúc ở server nhưng client vẫn đứng yên. Ghi lý do TIMEOUT trong phần tử `nhat_ky_luot_danh` tương ứng (trường hành động = `TIMEOUT`) như một lượt bình thường, kèm `so_luot` mới của lượt đó.

Điều này đủ để xử lý mọi trường hợp có ít nhất một trong hai client còn hoạt động (mở lại app, F5, hoặc Realtime reconnect đều tính là "chạm"). ⚠️ **CẦN DUYỆT**: bất biến trên **không** đảm bảo trận tự kết thúc nếu **cả hai** client đóng hoàn toàn và không bao giờ quay lại — trường hợp đó cần thêm job nền (cron/scheduled Edge Function) quét các trận PvP quá hạn định kỳ. Đề xuất mặc định cho v1: **không bắt buộc job nền** (chấp nhận trận "treo" ở trạng thái DANG_DIEN_RA vô thời hạn cho tới khi có ai đó chạm lại, không ảnh hưởng người chơi khác vì phòng đã bị chiếm dụng chỉ giữa 2 người này) — xác nhận lại nếu bạn cần đảm bảo trận luôn kết thúc đúng hạn kể cả khi cả hai bỏ đi.

---

## Tiêu chí nghiệm thu Phần 2

- [ ] Tạo phòng sinh mã phòng hợp lệ, người chơi thứ hai nhập đúng mã sẽ vào được phòng.
- [ ] Nhập sai mã hoặc mã của phòng đã đầy/đã huỷ → báo lỗi rõ ràng, không vào nhầm phòng khác.
- [ ] Hai người chơi trên hai thiết bị/trình duyệt khác nhau thấy đồng bộ đúng cùng một trạng thái trận đấu theo thời gian thực.
- [ ] Đối kháng PvP dùng đúng engine lượt đánh ở mục 1.5 — không có logic combat trùng lặp viết riêng cho PvP.
- [ ] **(BẢO LƯU — Co-op, không nghiệm thu ở v1.8.0)** Đi ải cùng nhau: thứ tự lượt giữa 3 actor (người chơi A, người chơi B, AI) tuân theo ATB, không phải vòng lặp cố định.
- [ ] **(BẢO LƯU — Co-op, không nghiệm thu ở v1.8.0)** Đi ải cùng nhau: một nhân vật người chơi bị hạ gục → người còn lại tiếp tục; trận thua khi cả hai người chơi chết, thắng khi AI chết trước.
- [ ] Client hiển thị đúng "Bạn thắng"/"Bạn thua" dựa trên so khớp `actor_id`/`nguoi_choi_id` của người dùng hiện tại với `actor_ids_thang` trả về — không có trường hợp PvP nào (1v1, đội hình lệch quân số, hay 3v3 đầy đủ, kể cả hòa) hiển thị sai kết quả.
- [ ] **(BẢO LƯU — Co-op, không nghiệm thu ở v1.8.0)** Co-op có ≥ 2 mục tiêu hợp lệ cho `MOT_DONG_DOI`: thiếu `target_actor_id` → bị từ chối; có `target_actor_id` hợp lệ → áp dụng đúng lên đồng đội được chọn. (Logic target 3v3 tương ứng được nghiệm thu ở mục 0.15.)
- [ ] Gửi `target_actor_id` là actor đã chết, actor sai phe, hoặc actor không tồn tại trong trận → server từ chối, không lặng lẽ đổi sang mục tiêu khác.
- [ ] Một người chơi đóng trình duyệt giữa trận → trận không bị treo vô thời hạn, có xử lý timeout hợp lý.
- [ ] **(Final Patch v1.8.0)** Mỗi người xác nhận đội hình **1–3** nhân vật khác nhau thuộc mình (không bắt buộc đúng 3, hai người không cần bằng số lượng); đội hình sai (0, >3, trùng, nhân vật của người khác) → server từ chối, phòng không chuyển `DANG_CHOI`.
- [ ] **(Final Patch v1.8.0)** Trận PvP tạo đúng số actor theo đội hình đã chọn (1v1→2, 1v2→3, 1v3→4, 2v2→4, 2v3→5, 3v3→6...); người chơi gửi hành động cho actor của đội đối phương → bị từ chối; hết hạn 90 giây ở một actor → đội của người đó thua, `actor_ids_thang` = toàn bộ actor đội kia (số lượng đúng bằng đội hình đội đó đã chọn, không phải luôn 3).
- [ ] **(v1.8.0)** Mỗi COMMIT trong chuỗi auto-resolve (kể cả auto-pass `KHONG_DU_MP`) phát một event Realtime riêng với `so_luot` tăng dần; reconnect giữa chuỗi lấy snapshot canonical đúng, không áp lại event cũ.

---

# PHẦN 3 — CHẾ ĐỘ DÀNH CHO NHÀ PHÁT TRIỂN

> Phụ thuộc Phần 0. Đây là khu vực cho phép thêm Class/Skill/Ngoại hình mới **không cần sửa code** — mục tiêu chính là loại bỏ nhu cầu quay lại yêu cầu build thêm cho mọi nội dung mới sau này.
>
> **Runtime: tác giả hoá nội dung (3.1–3.7, 3.9) là Online-only** — ghi vào nguồn dữ liệu chính (Postgres), luôn cần Internet + cổng mật khẩu Dev. **Sandbox Test (3.8) chạy qua Local Runtime** — mô phỏng combat in-process, không ghi DB, không bắt buộc Internet sau khi nội dung cần test đã có sẵn (đã tải hoặc đang soạn thảo trong phiên Dev hiện tại). Đây là công cụ dành cho nhà phát triển, không phải một bước người chơi PvE thông thường phải đi qua (mục 0.2).

## 3.1 Yêu cầu bảo mật — BẮT BUỘC, KHÔNG CÓ NGOẠI LỆ

Đây là phần quan trọng nhất của Phần 3. Vi phạm bất kỳ điều nào dưới đây coi như chưa đạt yêu cầu, bất kể giao diện có hoạt động hay không.

1. **Không được so sánh mật khẩu ở phía trình duyệt (client-side).** Mọi đoạn JavaScript chạy trên trình duyệt đều có thể xem được bằng công cụ dev của trình duyệt — nếu mật khẩu hoặc logic so sánh nằm ở đó, nó bị lộ ngay lập tức và vô hiệu hoá toàn bộ mục đích bảo vệ.
2. Mật khẩu lưu trong `dev_settings.mat_khau_hash` dưới dạng **băm** (bcrypt hoặc tương đương), không bao giờ dưới dạng văn bản thường.
3. Khi người dùng nhập mật khẩu ở liên kết "Dành cho nhà phát triển", gửi lên **Edge Function `kiem_tra_mat_khau_dev`** — hàm này băm giá trị nhập vào, so sánh với `mat_khau_hash`, trả về đúng/sai. Không trả mật khẩu thật hay hash về client trong bất kỳ trường hợp nào.
4. Khi đúng, server cấp một **phiên/token xác thực Dev** (ví dụ JWT có claim riêng, hoặc session flag lưu server-side) — có hạn sử dụng hợp lý (ví dụ vài giờ), không phải vĩnh viễn.
5. **Mọi API tạo/sửa Class, Skill, Ngoại hình đều phải tự kiểm tra token Dev ở phía server** (qua Edge Function guard hoặc RLS policy kiểm tra claim), không được chỉ dựa vào việc ẩn/hiện nút trên giao diện. Một người dùng gọi thẳng API mà không qua giao diện phải vẫn bị chặn nếu không có token hợp lệ.
6. Có hành động **"Đổi mật khẩu nhà phát triển"** ngay trong khu vực Dev, cho phép thay mật khẩu khởi tạo được cấu hình khi triển khai (không hard-code trong source; nếu môi trường dev dùng giá trị mặc định thì phải đổi ngay sau lần đăng nhập đầu) sau lần dùng đầu tiên.

---

## 3.2 Cổng vào

- Liên kết "Dành cho nhà phát triển" trên Menu chính (đã hiển thị nhưng khoá chức năng từ Phần 1, theo mục 1.2/4.5) mở một hộp nhập mật khẩu.
- Nhập đúng → chuyển vào khu vực Dev (route riêng, ví dụ `/dev`), lưu phiên/token bằng cơ chế an toàn do hệ thống chọn; ưu tiên cookie HttpOnly/Secure/SameSite hoặc tương đương, tránh localStorage cho token nhạy cảm.
- Nhập sai → báo lỗi chung chung, không phân biệt "sai mật khẩu" với các loại lỗi khác để tránh dò đoán.

## 3.3 Thư viện hiệu ứng (chỉ xem)

Hiển thị toàn bộ 19 dòng trong `hieu_ung_dinh_nghia`: mã, tên hiển thị, nhóm, danh sách tham số cấu hình được, đối tượng mặc định, thời điểm khả dụng. Đây là tài liệu tham chiếu để nhà phát triển biết có gì để ghép skill — **không chỉnh sửa hay thêm dòng mới được ở màn này**.

## 3.4 Trình tạo kỹ năng (kéo-thả)

| Bước | Hành động |
|---|---|
| 1 | Nhập tên skill, chọn Class sở hữu, chọn icon |
| 2 | Kéo một hoặc nhiều hiệu ứng từ Thư viện hiệu ứng vào vùng soạn skill |
| 3 | Với mỗi hiệu ứng đã thả vào: điền giá trị tham số theo đúng `tham_so_schema` của hiệu ứng đó, chọn Đối tượng và Thời điểm áp dụng (giới hạn trong `thoi_diem_kha_dung` của hiệu ứng đó) |
| 4 | Sắp xếp lại thứ tự các hiệu ứng đã thả (kéo để đổi vị trí) — **thứ tự này quyết định thứ tự áp dụng khi thi triển skill**, đúng theo engine ở mục 1.5.3 (bước 7b) |
| 5 | Nhập **mô tả bằng tay** hiển thị cho người chơi — hệ thống không tự sinh mô tả từ danh sách hiệu ứng đã ghép |
| 6 | Đặt số lượt hồi chiêu |
| 7 | Xem trước skill: tên, icon, MP, cooldown, mô tả và thứ tự effect; không thực thi thật |
| 8 | Lưu → ghi vào bảng `ky_nang` |

**Ràng buộc validate trước khi lưu**: tối thiểu 1 hiệu ứng; đủ tham số bắt buộc; mô tả không rỗng; tên/mã không trùng; `chi_phi_mp >= 0`; `hoi_chieu_luot >= 0`; skill phải thuộc Class đang `HOAT_DONG`. Validation phải thực hiện cả client và server. Server phải kiểm tra mã hiệu ứng tồn tại, tham số đúng schema/kiểu/range, `doi_tuong`/`thoi_diem` hợp lệ, thứ tự mảng hợp lệ, skill thuộc Class hợp lệ và trạng thái cho phép sử dụng; không tin JSONB từ client.

- **`thoi_diem` của Skill**: chỉ chấp nhận `KHI_THI_TRIEN` ở v1.7.0 (theo mục 0.8.3) — chọn `KHI_DANH_TRUNG` hoặc `BI_DONG_DAU_TRAN` bị từ chối lưu. `BI_DONG_DAU_TRAN` chỉ được dùng trong cấu hình Nội tại Class theo mục 0.8.2, không phải Skill.
- **Ràng buộc target đơn (theo mục 1.5.3):** một skill không được có 2 effect trở lên cùng cần `target_actor_id` với `doi_tuong` khác nhau (`MOT_DICH` + `MOT_DONG_DOI` trong cùng skill) — chặn lưu nếu vi phạm, vì v1 chỉ hỗ trợ 1 `target_actor_id` cho mỗi lượt dùng skill.
- **Ràng buộc CC (v1.8.0, mục 0.8.5):** `EFF_STUN`/`EFF_SILENCE`/`EFF_ROOT` phải có `so_luot ≤ 2` và `doi_tuong ∈ {MOT_DICH, NGAU_NHIEN_N_DICH}` — cấm `TAT_CA_DICH`.
- **Cảnh báo cân bằng 3v3 (không chặn lưu):** effect nhắm `TAT_CA_DICH`/`TAT_CA_DONG_DOI` mà giá trị mỗi mục tiêu ≈ skill đơn mục tiêu cùng chi phí → cảnh báo theo hướng dẫn mục 0.13.4. Preview skill hiển thị số mục tiêu tối đa thực tế của đội đối phương trong trận (1 đến 3, tùy đội hình) và tổng giá trị nếu trúng toàn bộ.
- **Cờ "Đặc trưng riêng" (`dac_trung_rieng`, mới v2.3.0):** chỉ hiển thị checkbox này khi Class sở hữu là `phan_loai = LINH_THAN`; với Class `THUONG`, field luôn `false`, ẩn khỏi UI (tránh Dev vô tình bật nhầm). Xem luật bắt buộc ở mục 0.8.4.G.

## 3.5 Quản lý Class + Nội tại Class

- Tạo Class mới: mã, tên hiển thị, mô tả, icon, **6 chỉ số nền**: HP/ATK/DEF/SPD/MP/MP hồi mỗi lượt.
- Mỗi Class hoạt động **bắt buộc có đúng 1 Nội tại Class**. Khi tạo Class mới, Dev Mode phải yêu cầu tạo nội tại ngay hoặc không cho chuyển Class sang `HOAT_DONG`.
- Nội tại gồm: mã, tên, mô tả, icon, trigger, điều kiện, 1–2 effect; chỉ được dùng các effect trong registry 19 hiệu ứng.
- Dev có thể sửa toàn bộ base stats, nội tại và trạng thái Class. Không xoá cứng Class/passive đã từng được tham chiếu; chuyển sang `AN` để ngừng xuất hiện trong luồng tạo nhân vật.
- Từ màn Class, xem danh sách skill đang thuộc Class, mở Skill Editor, và xem nội tại hiện tại của Class.
- Có **Preview Class**: hiển thị stat, passive và toàn bộ skill theo cách người chơi sẽ thấy trước khi lưu.
- Có nút **Thử chiến** mở Sandbox Test theo mục 3.8.
- **(v1.8.0)** Khi lưu/kích hoạt Class: validate `MAX(spd_nen)/MIN(spd_nen) ≤ 2.0` trên toàn bộ Class `HOAT_DONG` (mục 0.7.3). Class Editor hiển thị bảng "% thực tế mỗi điểm" (0.8.4.F) và Preview Class hiển thị Base/Bonus/Final với ví dụ phân bổ. Passive chỉ được dùng `doi_tuong` hợp lệ (mục 0.7.4). **Dev Mode không sửa hệ số quy đổi Stat Allocation** — đó là hằng số của đặc tả, đổi qua phiên bản spec (giá trị được chụp vào snapshot).
- **(v2.3.0) Hard block cho Class `LINH_THAN`:** không cho chuyển `trang_thai = HOAT_DONG` (hoặc publish lần đầu ở trạng thái `HOAT_DONG`) nếu không có bất kỳ skill nào thuộc Class (`ky_nang.dac_trung_rieng = true`) hoặc chính `noi_tai_class.dac_trung_rieng = true` — thông báo lỗi chỉ thẳng "Linh Thần cần ít nhất 1 đặc trưng riêng trước khi kích hoạt" kèm link tới skill/Nội tại cần đánh dấu. Đây là CHECK tầng ứng dụng (mục 0.8.4.G điều kiện 1-2), không phải một bước combat engine.

## 3.6 Quản lý kho ngoại hình

- Upload ảnh mới vào `ngoai_hinh_asset`: chọn danh mục (Tóc/Mặt/Áo/Quần/Trang sức), đặt tên hiển thị, chọn giới tính tương thích.
- **Không cần upload riêng theo từng màu da** — hệ thống tint màu da tại thời điểm hiển thị theo mục 0.9, ảnh chỉ cần upload một lần dạng trung tính.
- Có thể thêm `mau_da_preset` mới (tên + giá trị tint) từ đây.

## 3.7 Kiểm tra dữ liệu & Preview trước khi lưu

Mọi form Dev Mode phải có hai lớp kiểm tra:

1. **Client-side validation** để phản hồi nhanh cho người dùng.
2. **Server-side validation bắt buộc** để bảo đảm dữ liệu không thể bị phá bằng request trực tiếp.

Các kiểm tra chung:
- Mã Class/Skill/Passive duy nhất, không rỗng, đúng quy tắc đặt tên.
- Stat số nguyên không âm và nằm trong range được engine cho phép.
- `SPD > 0`; `MP >= 0`; `mp_hoi_moi_luot >= 0`.
- Skill có 1–N effect hợp lệ; Passive có **1–2 effect**.
- Effect, tham số, target, timing phải khớp registry và rule engine.
- Không cho lưu Class `HOAT_DONG` nếu thiếu Passive `HOAT_DONG`.
- Không cho sửa/xoá dữ liệu đang được snapshot của trận cũ theo cách làm thay đổi snapshot lịch sử; dữ liệu sống có thể sửa nhưng trận cũ vẫn bất biến.
- Preview chỉ đọc dữ liệu form hiện tại, không tự ghi DB.
- **(v1.8.0)** Class: tỉ lệ SPD; Passive: `doi_tuong` không cần chọn target; Skill: ràng buộc CC (3.4). Cấu hình đội AI (`doi_ai[]`) dùng cùng validator với nhân vật người chơi (skill thuộc đúng Class, ≤ 4 skill, `phan_bo_diem` hợp lệ, `ai_archetype` hợp lệ) — Dev Mode chưa có màn CRUD `man_choi` ở v1.8.0 nhưng validator được dùng cho seed và migration.

## 3.8 Sandbox Test — thử Class/Skill/Passive/đội hình (1–3 vs 1–3) không ảnh hưởng dữ liệu thật

Dev Mode có chế độ **Sandbox Test** dùng chính Shared Combat Engine production (`bat_dau_tran` + `thuc_hien_luot_danh`) qua **Local Runtime** — gọi in-process, không transaction Postgres, trên dữ liệu thử riêng.

- Dựng **đội hình 1–3 vs 1–3** (không bắt buộc đủ 3 mỗi bên): chọn Class, Passive, Skill (≤ 4) và `phan_bo_diem` (qua cùng validator: tổng 5, ≤ 2/stat) cho từng actor của cả hai đội, hoặc dùng AI mẫu (chọn `ai_archetype`) cho một hoặc cả hai đội.
- Cho phép thay đổi **tạm thời** HP/MP/cooldown/gauge ATB ban đầu và `phan_bo_diem` trong phạm vi Sandbox, **không ghi ngược** vào bảng Class/Skill/Passive/`nhan_vat`.
- Hai chế độ điều khiển: Dev tự điều khiển cả hai đội từng lượt; hoặc **AI-vs-AI tự chạy** N trận để thu metric ở mục 0.14 và kiểm tra cân bằng giá trị điểm, hard counter, focus fire. AI deterministic nên biến thiên đến từ cấu hình đội hình và `NGAU_NHIEN_N_DICH`.
- Combat log chi tiết: actor + đội, ATB (gauge, `chuoi_luot`), MP, cooldown, passive trigger, effect, damage/heal/shield, target, CC/`khang_cc`, death, victory.
- Có thể chạy lại nhiều lần. Không tạo `tien_do_di_ai`, không ảnh hưởng nhân vật người chơi, PvP hay Đi ải; không phát Realtime event vào phòng thật; không đọc/sửa `tran_dau` đang diễn ra của người chơi.
- Sandbox phải dùng cùng rule engine/transaction path; **không được viết combat simulator khác** với engine production.

## 3.9 Chính sách hiệu lực nội dung

Nội dung tạo/sửa trong Dev Mode **có hiệu lực ngay lập tức với các trận MỚI bắt đầu sau thời điểm lưu** — không có bước duyệt/xuất bản riêng ở v1. **Trận đang diễn ra (`trang_thai = DANG_DIEN_RA`) không bị ảnh hưởng**: engine dùng `tran_dau.du_lieu_noi_dung_snapshot` đã chốt tại `bat_dau_tran` (mục 1.5.2), không đọc lại bảng `class`/`ky_nang` sống giữa trận. Không tự thêm cơ chế nháp/xuất bản nếu không được yêu cầu bổ sung — giữ đơn giản theo đúng phạm vi này.

---

## Tiêu chí nghiệm thu Phần 3

- [ ] Mở tab ẩn danh, kiểm tra Network: mật khẩu Dev chỉ được gửi qua HTTPS/TLS tới endpoint xác thực, không xuất hiện trong response, URL/query string, client log, localStorage hoặc source bundle; không có đoạn code so sánh mật khẩu ở client.
- [ ] Gọi trực tiếp API tạo/sửa Skill/Class/Passive/Ngoại hình mà không có token Dev hợp lệ → bị từ chối ở phía server, bất kể gọi từ đâu.
- [ ] Nhập sai mật khẩu nhiều lần → không có gợi ý phân biệt giữa "sai mật khẩu" và các lỗi khác.
- [ ] Đổi mật khẩu Dev thành công, đăng xuất, đăng nhập lại bằng mật khẩu mới hoạt động, mật khẩu cũ không còn dùng được.
- [ ] Tạo một skill mới bằng kéo-thả, gồm ít nhất 2 hiệu ứng theo thứ tự cụ thể, gán vào một Class → vào game, tạo nhân vật thuộc Class đó, trang bị skill vừa tạo, dùng thử trong một trận PvE → hiệu ứng áp dụng đúng thứ tự đã cấu hình, mô tả hiển thị đúng như đã nhập tay.
- [ ] Tạo một Class mới hoàn toàn từ Dev Mode → phải cấu hình được đủ 6 base stats và 1 Nội tại Class → Class xuất hiện ngay trong danh sách chọn Class ở luồng tạo nhân vật, không cần build lại ứng dụng.
- [ ] Tạo/sửa Nội tại Class gồm 1–2 effect → vào trận mới → passive tự kích hoạt đúng trigger/điều kiện, không chiếm slot skill và không cần client gửi request riêng.
- [ ] Dev sửa Passive giữa một trận đang diễn ra → trận cũ tiếp tục dùng passive trong snapshot cũ; trận mới dùng passive mới.
- [ ] Tạo Skill có MP cost/cooldown/2 effect → Preview hiển thị đúng; lưu xong skill xuất hiện trong Class tương ứng và engine dùng đúng dữ liệu.
- [ ] Sandbox chạy thử Class/Skill/Passive nhiều lần → không tạo tiến độ, không thay đổi nhân vật thật và không phát event vào trận thật.
- [ ] **(Final Patch v1.8.0)** Sandbox dựng được đội hình bất kỳ tổ hợp 1–3 vs 1–3 (không chỉ 3v3) với `phan_bo_diem` qua cùng validator (tổng ≠ 5 hoặc > 2/stat bị từ chối); chạy AI-vs-AI N trận và xuất được các metric mục 0.14.
- [ ] **(v1.8.0)** Class Editor từ chối lưu khi vi phạm `TY_LE_SPD_TOI_DA`; Skill Editor từ chối STUN/SILENCE/ROOT `so_luot > 2` hoặc `TAT_CA_DICH`; Passive Editor từ chối `MOT_DICH`/`MOT_DONG_DOI`.
- [ ] Bắt đầu 1 trận PvE, trong lúc trận đang diễn ra vào Dev Mode sửa một thông số (ví dụ hệ số sát thương) của skill đang được dùng trong trận đó → trận đang diễn ra vẫn áp dụng đúng giá trị CŨ (theo `du_lieu_noi_dung_snapshot` đã chốt lúc bắt đầu); chỉ trận mới bắt đầu sau khi sửa mới dùng giá trị mới.
- [ ] Upload một ngoại hình mới → xuất hiện ngay trong luồng tạo/sửa nhân vật, tương thích đúng giới tính đã chọn, tint đúng theo mọi `mau_da_preset` hiện có mà không cần upload lại ảnh.

---

# PHẦN 4 — PHỤ LỤC

## 4.1 Giả định mặc định đã áp dụng trong đặc tả (điều chỉnh trước khi build nếu không đúng ý)

| # | Giả định | Vị trí áp dụng |
|---|---|---|
| 1 | Mỗi trận 2 đội, mỗi đội **1–3** nhân vật/actor (không bắt buộc đúng 3, kể cả đội người chơi lẫn đội AI; hai đội không cần bằng số lượng — final patch, thay giả định "đội người chơi đúng 3" ban đầu của v1.8.0); PvP vẫn 1 người/đội, ghép bằng mã phòng, không party matchmaking | mục 0.6, 2.1 |
| 2 | Không có hệ thống tài khoản phức tạp — tài khoản đơn giản (tên đăng nhập/mật khẩu) | mục 0.7.1 |
| 3 | Không có phần thưởng/exp/vật phẩm/currency sau trận, chỉ có kết quả và tiến độ Đi ải | mục 1.6.2 |
| 4 | Thứ tự lượt tính theo ATB (ngưỡng 1000) kèm trần lượt liên tiếp (actor 2, đội 3) và trần gauge 2000 — hằng số khởi điểm, ⚠️ theo playtest | mục 1.5.0 |
| 5 | Bộ 19 hiệu ứng là danh sách đóng | mục 0.8 |
| 6 | Nội dung Dev Mode có hiệu lực ngay, không có bước nháp/duyệt; Preview/Sandbox không ghi dữ liệu thật | mục 3.7–3.9 |
| 7 | Ghép trận qua mã phòng, không kết nối theo IP thật | mục 2.1 |
| 8 | Stat Allocation quy đổi theo % chỉ số nền (HP/ATK/DEF 6%, SPD 3%, MP 10%, MP Regen 15%, tối thiểu +1/điểm) — hệ số khởi điểm ⚠️ | mục 0.8.4 |
| 9 | Respec miễn phí, không giới hạn, chỉ ngoài trận | mục 0.8.4.E |
| 10 | Tỉ lệ SPD nền giữa các Class ≤ 2:1; `spd_hien_tai` clamp [50%, 150%] gốc | mục 0.7.3, 0.8.1.H |
| 11 | Kháng CC 2 lượt; CC khoá `so_luot ≤ 2`; một CC khoá/actor; CC khoá không nhắm `TAT_CA_DICH` | mục 0.8.5 |
| 12 | Trần khiên 50% HP tối đa; CLEANSE ưu tiên gỡ `KHONG_CHE`; CC lưu trong mảng `debuff` | mục 0.8.1.I/J |
| 13 | Passive: chain depth = 1; DOT/HOT không kích hoạt passive; passive chỉ dùng `doi_tuong` không cần chọn target | mục 0.7.4, 0.8.2 |
| 14 | Cả hai đội cùng bị xóa sổ → hòa; `GIOI_HAN_HANH_DONG = 150` chống trận vô hạn | mục 1.5.5 |
| 15 | AI chỉ dùng thông tin UI hiển thị cho người chơi; trọng số scoring là giá trị khởi điểm ⚠️ | mục 1.5.4 |
| 16 | Skill Editor cho chọn `doi_tuong` bất kỳ trong enum cho từng effect (registry chỉ đặt giá trị mặc định) | mục 0.13.2 |
| 17 | Co-op 2v1 bảo lưu, không build ở v1.8.0 | mục 2.4.2 |
| 18 | Metric chỉ dùng dữ liệu có trong log combat; ngưỡng là experimental | mục 0.14 |

## 4.2 Các quyết định v1 đã chốt trước khi build

1. **Mỗi đội 1–3 nhân vật/actor, KHÔNG bắt buộc đúng 3**: chốt cho v1.8.0 (final patch), thay quyết định "1 nhân vật/bên/trận" của v1.0–v1.7.0, và thay luôn giả định trung gian sai "đội người chơi đúng 3" mà v1.8.0 từng ghi trước patch này. Cấu hình 1v1 đến 3v3 (bao gồm lệch quân số như 1v3) đều hợp lệ, dùng chung một engine, không handicap.
2. **Không EXP/cấp độ/phần thưởng/vật phẩm**: chốt cho v1; đây là giới hạn phạm vi hiện tại.
3. **19 hiệu ứng đóng**: chốt cho v1. Không thêm `REFLECT`, `INVULNERABLE`, triệu hồi, hồi sinh... vào engine trước khi có yêu cầu thiết kế riêng.
4. **SPD quyết định turn order qua ATB** (ngưỡng 1000, xem 1.5.0) ở v1 — không còn là luân phiên cố định.
5. **PvP timeout = 90 giây/lượt**, do server kiểm soát; hết hạn thì bên đang có lượt thua.
6. **Tiến độ Đi ải** lưu ở `tien_do_di_ai`.
7. **Realtime** cleanup khi rời/kết thúc/unmount và resync snapshot sau reconnect.
8. **JSONB skill** phải được validate server-side theo registry schema.
9. **Paper-doll** dùng `thu_tu_lop` (z-index); chưa cần tách thêm danh mục AO ở v1.
10. **MP** hồi theo lượt của chính actor (`mp_hoi_moi_luot`), không hồi theo thời gian thực; không đủ MP cho skill nào và hết cooldown khả dụng → BỎ_LƯỢT.
11. **Co-op 2v1**: bảo lưu, không build ở v1.8.0 (mục 2.4.2). Luật cũ (một người chơi chết không kết thúc trận; chỉ thua khi cả hai chết) giữ làm tài liệu tham chiếu.
12. **Mỗi Class hoạt động có đúng 1 Nội tại riêng**, không chiếm slot skill; nội tại dùng 1–2 effect từ registry 19 effect và được snapshot khi bắt đầu trận.
13. **Tạo nhân vật gồm 5 bước + xem lại** (Class → Tên → Phân bổ 5 điểm → Ngoại hình → Skill), trong đó tên bắt buộc 1–24 ký tự Unicode, không cần duy nhất.
14. **Thiếu MP toàn bộ skill đang sẵn sàng → server tự BỎ_LƯỢT**, lý do `KHONG_DU_MP`; không cần client gửi action và không chờ timeout.
15. **Dev Mode có Sandbox Test**, dùng cùng combat engine nhưng dữ liệu thử tách biệt, không ảnh hưởng dữ liệu/trận thật.
16. **Stat Allocation 5 điểm, tối đa 2 điểm/stat, 6 stat**; quy đổi theo % chỉ số nền; server tính; snapshot cả hệ số lẫn chỉ số cuối; respec miễn phí ngoài trận.
17. **Counter ≠ Hard Counter**: không giảm sát thương toàn cục để chống focus fire; dùng công cụ sẵn có + các trần an toàn (0.13.3). Không thêm effect mới (taunt/guard/protection).
18. **SPD là lợi thế, không phải quyền sở hữu trận đấu**: budget SPD của Class, clamp buff/slow, trần lượt liên tiếp.
19. **CC không có infinite lock**: một CC khoá/actor, Kháng CC 2 lượt, thời lượng ≤ 2.
20. **Không hard-code combo Class**; synergy phát sinh từ dữ liệu.
21. **Cả hai đội cùng bị xóa sổ → hòa**; trận có giới hạn hành động.

## 4.3 Quy tắc build bắt buộc

- File này là **single source of truth** cho v1. Nếu code khác tài liệu, ưu tiên tài liệu trừ khi có thay đổi yêu cầu được ghi nhận rõ.
- Không tự ý thêm EXP, level, item, equipment, reward, currency, đội hình quá 3 nhân vật/đội (nhưng đội hình **dưới** 3, tức 1 hoặc 2, luôn hợp lệ và không cần "vá" thêm gì), combat realtime, handicap cho đội ít quân hơn, hoặc hiệu ứng mới ngoài registry 19 hiệu ứng. Không hard-code combo Class trong engine; Sandbox, AI và preview dùng cùng resolver với production.
- Mọi thay đổi schema phải có migration và cập nhật đặc tả.
- Logic combat quan trọng phải có test server-side; UI test không thay thế test engine.
- Mọi mutation phải kiểm tra quyền ở server; ẩn nút UI không phải biện pháp bảo mật.
- Phải test concurrent request, reload và reconnect đối với trạng thái combat.
- Không dùng optimistic update cho kết quả combat.
- Chỉ chuyển sang phần kế tiếp sau khi đạt toàn bộ tiêu chí nghiệm thu của phần hiện tại.

---

## 4.4 FUTURE ROADMAP — ngoài phạm vi v1.8.0 (KHÔNG build, chỉ ghi nhận)

Các mục dưới đây có thể tăng replayability/retention nhưng làm phình scope hoặc cần dữ liệu playtest trước; theo nguyên tắc "combat sâu hơn, rõ hơn, cân bằng hơn" chúng chỉ được ghi nhận ở đây.

- **Tiến trình & kinh tế:** level/EXP, equipment/weapon/armor/rune/artifact, gear rarity, skill/talent tree, currency, loot box/gacha, battle pass, pet, guild/clan, cosmetics progression.
- **Xếp hạng & cạnh tranh:** ranking, season, tournament, spectator, replay, surrender/đầu hàng, party matchmaking.
- **Co-op:** thiết kế lại Đi ải cùng nhau (2 người × đội 3 vs đội AI; phân chia điều khiển actor, timeout theo người).
- **UX/retention:** lưu đội hình mặc định **phía server** (v1.9.1 đã có bản tối thiểu phía client/local — mục 1.4a — giữ ở màn hình, không cần đồng bộ server); telemetry Rematch Rate / One-More-Game Rate; thuật toán "Key Moment" sau trận; dự báo/hiển thị ATB nâng cao; tutorial dạng video/quest-based (nếu contextual hint ở mục 0.5a không đủ theo playtest); mời rematch với đúng đối thủ PvP cũ.
- **AI nâng cao:** lập kế hoạch nhiều lượt, phối hợp combo giữa các actor AI, mức độ khó AI; boss (1 actor có hệ số cộng thêm) khi có dữ liệu cân bằng.
- **Effect mới (chỉ khi playtest chứng minh cần):** taunt/guard/protection, hồi sinh, phản đòn, miễn nhiễm; đếm `so_luot` DOT/HOT theo lượt của carrier (xem 4.7).
- **Nội dung:** procedural dungeon, thêm Class/skill theo dữ liệu Dev Mode (không cần đổi engine).

## 4.4a Proposal Audit — đối chiếu đề xuất Gemini (v2.0.0, final cross-AI red team)

> Coi mọi đề xuất từ AI khác là **design proposal cần red-team lại**, không mặc định đúng hay sai. Decision chỉ ở 1 trong 4 mức: `PATCH NOW` / `TEST FIRST` (Playtest-verifiable) / `FUTURE` / `DO NOT ADD`.

| Đề xuất (Gemini) | Evidence | Decision | Lý do |
|---|---|---|---|
| Chủ đề Cổ tích Việt Nam cho seed Class (Sơn Tinh, Thạch Sanh, Thánh Gióng...) | Yêu cầu "4 Class phân biệt rõ lối chơi" đã có sẵn ở mục 1.7 nhưng chưa có ví dụ minh hoạ cụ thể; đây là data thuần, zero rủi ro engine | **PATCH NOW** | Đã thêm bảng minh hoạ ở mục 1.7. Không phải nội dung bắt buộc — Dev Mode toàn quyền đổi |
| ATB hiển thị dạng Timeline/Turn Order Queue tường minh | Cả audit kỹ thuật (ChatGPT, mục 11) và audit trải nghiệm (Gemini) độc lập chỉ ra cùng rủi ro "ATB cảm giác random"; field `du_bao_thu_tu` đã tồn tại từ v1.3, chỉ thiếu yêu cầu render cụ thể | **PATCH NOW** | Presentation-only, dùng data đã có, không đổi engine (mục 1.5.0) |
| Phân nhóm màu 19 effect (buff/debuff/CC) + icon CC nổi bật | Field `nhom` đã tồn tại trong registry (mục 0.8); rủi ro information-overload đã tự nhận diện ở mục 0.5a (hint theo nhóm effect) nhưng chưa có yêu cầu UI cụ thể | **PATCH NOW** | Presentation-only, dùng field có sẵn, không tạo phân loại mới |
| Bắt buộc mỗi Class có 1 skill "cơ bản" Cooldown=0/MP=0 để giảm dead-turn | Spec tự nhận diện rủi ro này ở mục 4.7 ("Agency risk: cooldown-only vẫn chờ người chơi bỏ lượt"); giải pháp là data constraint, không phải cơ chế "đánh thường" mới | **PATCH NOW (dạng khuyến nghị mềm, không chặn lưu)** | Đủ bằng chứng từ chính risk assessment trước đó; chọn mức "cảnh báo mềm" thay vì "bắt buộc cứng" vì chưa có playtest xác nhận đây là giải pháp đúng duy nhất — an toàn hơn là ép cứng rồi phải rút lại |
| Pipeline Cursor (engine headless) → Lovable/Bolt (UI) với golden fixtures | Khớp trực tiếp với contract Local/Online equivalence đã yêu cầu ở mục 1.5.0a (OFF-08) — chỉ là quy trình hiện thực hoá điều đã chốt | **PATCH NOW** | Process guidance, không phải gameplay/engine, rủi ro thấp, lợi ích rõ (giảm rủi ro tích hợp) |
| ~~Shop + Currency offline (Local Storage) để mở khoá nhân vật~~ | **SUPERSEDED ở v2.1.0** — xem hàng bên dưới và mục 4.4d. Đánh giá gốc ở đây (v2.0.0) đúng với premise cũ "thưởng theo mọi lần thắng"; premise mới (first-clear + mục tiêu phụ hữu hạn) là | ~~DO NOT ADD~~ → xem 4.4d | Giữ hàng lịch sử này để không xoá lịch sử audit (mục 26); quyết định hiệu lực nằm ở 4.4d |
| **Hương Hỏa/Bách Thần Điện — premise v2.2 (DUY NHẤT first-clear, mỗi màn 1 lần, không random/gacha, chọn trực tiếp 1 trong 4 Linh Thần)** | Re-audit đầy đủ ở mục 4.4d với evidence cụ thể: tổng PvE first-clear MVP (300) = đúng chi phí 1 Linh Thần (300); không còn faucet lặp lại vì gắn vào state tiến độ idempotent, không gắn vào hành động Đấu lại; đã bỏ "mục tiêu phụ" của v2.1.0 để economy chỉ còn đúng 1 công thức, 1 invariant | Đúng như đánh giá gốc — nhưng premise v2.2 **không phải** hệ thống đó: không random/gacha, đúng 1 nguồn hữu hạn không lặp lại được, không Shop generic (chỉ 1 màn chọn trực tiếp). Toàn bộ điều kiện Economy Gate (0.8.6.C-F) đã được định nghĩa số cụ thể, không còn "chưa định nghĩa điều nào" như kết luận cũ |

## 4.4c Anti-Farming Audit — đề xuất "Hương Hỏa / Bách Thần Điện" (v2.0.1)

> Yêu cầu audit: nếu Hương Hỏa (tiền tệ PvE, lưu local) + Bách Thần Điện (mở khoá Linh Thần chỉ số cao cấp) được cân nhắc, phải trả lời **có/không** cho câu: *"Một người chơi có thể spam một PvE stage hoặc Rematch liên tục để farm Hương Hỏa không?"* — bằng flow cụ thể và explicit rule, không bằng "cân bằng reward rate".

**Câu trả lời bắt buộc: CÓ — nếu Hương Hỏa gắn vào kết quả thắng PvE theo thiết kế hiện tại của spec.**

Flow cụ thể (dựa trên đúng luồng đã có ở mục 1.4a, không giả định thêm gì):
```text
PvE Đối kháng thắng (+X Hương Hỏa)
→ nút "Đấu lại" (1.4a) gọi bat_dau_tran với đúng đội hình cũ, đội AI đối kháng mới sinh (1.6.1)
→ thắng (+X) → "Đấu lại" → thắng (+X) → ...   (không có bất kỳ giới hạn số lần nào trong spec)
PvE Đi ải: "Đấu lại màn này" (1.4a) → cùng một màn, lặp vô hạn, cùng kết quả
```
- **Faucet nằm ở đâu:** ở chính sự kiện `KET_THUC` + thắng của một trận PvE, kết hợp nút Đấu lại/Đấu lại màn này — hai thứ này *hợp lệ và cần thiết* cho UX (mục 1.4a) nên không thể bỏ để chặn farm.
- **Mức độ nguy hiểm:** cao. Không có trần, không có chi phí (không stamina/energy — và spec cấm thêm), tốc độ farm chỉ bị giới hạn bởi thời gian một trận.
- **Vòng phản hồi dương (9A.4):** `farm → Hương Hỏa → mở khoá Linh Thần chỉ số cao → thắng nhanh hơn → farm nhanh hơn`. Mâu thuẫn trực tiếp với triết lý cân bằng đã chốt: Stat Allocation cố tình giới hạn chênh lệch sức mạnh ≈ ±12% (mục 0.7.10/0.8.4, ≈6%/điểm, tối đa 2 điểm/stat) và toàn bộ thiết kế đội hình lệch quân số 1v3/2v3 dựa trên "không handicap, không chênh lệch sức mạnh lớn". Một nhân vật "chỉ số cao cấp" mở khoá bằng tiền tệ phá đúng giả định này.

**Đánh giá 4 phương án tối thiểu (9A.1):**
| Phương án | Chặn được farm? | Kết luận |
|---|---|---|
| A. First-clear/milestone (tối đa 3 lần với 3 màn) | Có về mặt logic (hữu hạn) | Khả thi *về logic*, nhưng xem giới hạn toàn vẹn dữ liệu bên dưới |
| B. Reward hữu hạn theo màn | Có | Tương đương A với 3 màn |
| C. Diminishing returns | Chỉ làm chậm, không dừng | Tạo economy khó hiểu — không cần cho MVP |
| D. Daily/weekly cap | Có | Kéo theo hệ thống ngày/tuần (daily system) — **bị cấm** ở mục 21/9A.7, reject |

**Giới hạn toàn vẹn dữ liệu (9A.3) — lý do kiến trúc, không chỉ lý do scope:** PvE chạy Local Runtime, lưu local, **không có server authority** (ADR-01, mục 0.2) — đây là quyết định nền tảng để PvE offline và không tốn chi phí vận hành, không nên đảo ngược. Hệ quả: mọi cờ "đã nhận thưởng" nằm trong local storage *có thể bị người chơi xoá/sửa/copy* (reset save, chỉnh IndexedDB, chép save sang máy khác) → phương án A/B **không thể được enforce**, chỉ có thể được "tin". Với game đơn người chơi offline, người chơi tự sửa dữ liệu của chính mình không hại ai và là chấp nhận được — **nhưng chỉ khi phần thưởng không có ý nghĩa cân bằng**. Hương Hỏa mở khoá *sức mạnh* thì có ý nghĩa cân bằng, nên không thể vừa "chạy offline không server" vừa "có economy có trọng lượng". Local storage **không bao giờ được gọi là secure currency** trong tài liệu này. (Rò rỉ sang PvP đã bị chặn sẵn bởi ADR-02: nhân vật PvE và PvP là hai hồ tách biệt.)

**Economy Gate (9A.6):** trong 11 điều kiện bắt buộc (nguồn, tần suất, replay, rematch, cap/first-clear, ownership, reset, unlock, power impact, độ khó PvE, tương tác progression loop), spec hiện **chưa định nghĩa điều nào** ngoài ownership local → theo đúng luật của audit: **không được coi là READY**.

**Verdict (giữ nguyên, nay có bằng chứng):** `DO NOT ADD` cho v1; nếu sau này cân nhắc lại thì xếp `FUTURE / PLAYTEST` với điều kiện vào cửa: (1) playtest chứng minh Replayability Gap thật, (2) phần thưởng chỉ là **cosmetic hoặc first-clear hữu hạn, không mở khoá sức mạnh**, (3) chấp nhận công khai rằng local save có thể bị sửa. Anti-bot (9A.5) **không cần** — không có online economy.

**Patch thật rút ra từ audit (rẻ, không thêm feature):** biến điều đang đúng ngầm thành **invariant tường minh** để không ai vô tình biến Rematch thành nút farm khi thêm tính năng sau này — xem `INV-PVE-1` ở mục 1.4a và test tương ứng ở mục 0.15.

## 4.4d Re-open ADR-07: Hương Hỏa premise v2 — ACCEPTED (v2.1.0)

> Trả lời 10 câu hỏi bắt buộc của final red-team, dựa trên số liệu thật trong file (không giả định):

| # | Câu hỏi | Trả lời |
|---|---|---|
| Q1 | Spam PvE farm được Hương Hỏa? | **Không** — nguồn duy nhất là `da_hoan_thanh` (idempotent, mục 0.8.6.E), không phải "mỗi lần thắng"; Đấu lại/Đấu lại màn này/Retry luôn cấp 0 |
| Q2 | Người chơi mới mở được bao nhiêu SSS chỉ từ first-clear? | **Đúng 1** (300/300, mục 0.8.6.F) |
| Q3 | Rematch có thưởng lại không? | **Không** |
| Q4 | Reset/retry có thưởng lại không? | **Không** trong logic bình thường (idempotency key ở DB/local, mục 0.8.6.E) — trừ khi tự sửa dữ liệu (mục H) |
| Q5 | Local save an toàn không? | **Không** — nói rõ ở mục 0.8.6.H, không tuyên bố chống sửa |
| Q6 | Điều đó hỏng PvP không? | **Không** — phòng `CAN_BANG` (mặc định) vô hiệu hệ số tier bất kể dữ liệu local; chỉ phòng `TU_DO` do chính nhóm bạn chọn mới bị ảnh hưởng (ADR-08) |
| Q7 | Nhân vật mới random ra SSS được không? | **Không** — roll chỉ trong `{B,A,S}` (0.8.6.A), `SSS` không nằm trong `trong_so_tier_tao_moi` |
| Q8 | Cần Shop generic không? | **Không** — Bách Thần Điện là màn chọn trực tiếp, không inventory/rotation (0.8.6.B) |
| Q9 | Cần Daily/Weekly/Stamina/Energy không? | **Không** — nguồn hữu hạn nên không cần cơ chế giới hạn theo thời gian |
| Q10 | Hương Hỏa cho SSS thứ 2 lấy ở đâu? | **Chưa có nguồn nào trong MVP cho SSS thứ 2, 3, 4** — content gate có chủ đích (mục 0.8.6.C/H), không bịa hệ thống mới (chốt lại ở v2.2.0: bỏ "mục tiêu phụ" từng dự định làm nguồn thứ 2 ở v2.1.0, vì đơn giản hoá economy quan trọng hơn mở thêm 1 SSS ngay từ MVP) |

### Architecture Impact (mục F yêu cầu)
Shared Combat Engine / Local Runtime / Online Runtime / PostgreSQL boundary / RNG contract / Content Snapshot / Realtime `so_luot`: **không đổi**. Hương Hỏa/Tier nằm hoàn toàn ở tầng "trước trận" (tạo nhân vật, Bách Thần Điện, cấp thưởng lúc `KET_THUC`) và tầng dữ liệu (`nhan_vat.tier`, `vi_huong_hoa`) — actor SSS đi vào `actors[]` như mọi actor khác (mục 0.8.6.G), không có nhánh code riêng trong combat.

**Verdict cuối:** `ACCEPTED`, thay thế `DO NOT ADD` của v2.0.1/ADR-07 cũ. Chi tiết implement đầy đủ: mục 0.7.0/0.7.1/0.7.3/0.7.10/0.7.11/0.7.12/0.7.13/0.7.13a/0.7.13b/0.7.14 (schema), 0.8.4 (công thức tier), 0.8.6 (economy), 1.3/1.4/1.4a/1.4b/1.2 (UI), 2.1/2.2 (PvP payload), 1.5.2 (snapshot), ADR-02/07/08/09/10 (0.1a), acceptance tests mục 0.15.


## 4.5 Lộ trình build theo 3 phần (tương ứng 3 prompt)

| Prompt | Phạm vi trong tài liệu này | Nội dung build |
|---|---|---|
| 1 | Phần 0 + Phần 1 (bỏ qua Phần 2, Phần 3) | Menu chính, Kho nhân vật, tạo nhân vật (5 bước + Stat Allocation), engine lượt đánh 3v3, PvE Đối kháng + Đi ải |
| 2 | Phần 0 + Phần 1 + Phần 2 | Phòng PvP theo mã, đồng bộ real-time, PvP Đối kháng 3v3 (Đi ải cùng nhau bảo lưu) |
| 3 | Phần 0 + Phần 3 | Khu vực Dành cho nhà phát triển: bảo mật, trình tạo skill, quản lý Class + Nội tại, quản lý ngoại hình, validation/preview và Sandbox Test |

Toàn bộ nội dung nằm trong CÙNG MỘT FILE — đính kèm nguyên file này cho cả 3 lượt prompt, chỉ nói rõ trong nội dung prompt là "chỉ build phạm vi Phần X, bỏ qua các Phần chưa tới lượt."

Nếu ngân sách một lượt build không đủ cho trọn một Phần, ưu tiên hoàn thành đúng **Tiêu chí nghiệm thu** của Phần đó trước khi bắt đầu Phần kế tiếp — không để một Phần dở dang rồi chuyển sang Phần sau.

---

## 4.6 Migration từ v1.7.0 sang v2.4.0

Nguyên tắc: **không tự ý phá dữ liệu cũ; không viết engine thứ hai; không tự tạo nội dung gameplay-breaking.**

| Hạng mục | Chiến lược |
|---|---|
| Trận đang `DANG_DIEN_RA` | Trước khi deploy: ngừng tạo trận mới (drain), chờ trận kết thúc hoặc đóng bằng `ket_qua = HOA` với lý do `NANG_CAP_PHIEN_BAN`. Không chạy trận 1v1 cũ bằng engine mới. |
| `tran_dau` đã `KET_THUC` | Giữ nguyên bất biến; gán `phien_ban_engine = '1.7.0'`; UI đọc `actors[]` cũ (có `phe`, không có `doi`) ở chế độ chỉ xem. |
| `nhan_vat` | Thêm 6 cột `diem_*` `DEFAULT 0`: mọi nhân vật cũ = 0 điểm, vẫn chơi được (bonus 0); UI gợi ý phân bổ 5 điểm miễn phí. Không tự phân bổ thay người chơi. |
| Người chơi có 0 nhân vật | Không sinh nhân vật tự động; UI dẫn tới "Tạo nhân vật mới". Có 1 hoặc 2 nhân vật đã đủ để vào trận (final patch: hạ điều kiện từ ≥3 xuống ≥1, mục 0.6/1.2). |
| `class` | Class `HOAT_DONG` vi phạm `TY_LE_SPD_TOI_DA` → báo cáo cho Dev sửa (hệ thống không tự đổi chỉ số). Class `HOAT_DONG` thiếu passive → không tự tạo passive; chuyển `AN` tới khi Dev bổ sung, giữ nguyên dữ liệu. |
| `noi_tai_class` | Passive có `doi_tuong = MOT_DICH/MOT_DONG_DOI` → báo lỗi migrate, Dev sửa trước khi Class hoạt động trở lại. |
| `man_choi.cau_hinh_ai` | Chuyển sang `doi_ai[]`: cấu hình 1 actor cũ → 1 phần tử (Class tương ứng, `phan_bo_diem` do Dev chọn tổng 5, `ai_archetype = AGGRESSIVE` — gần với hành vi "ưu tiên sát thương" của AI cũ). Cấu hình không map được về Class → Dev nhập lại. |
| `phong_choi` | Thêm `doi_hinh_*` (null); phòng đang mở (`CHO_NGUOI_CHOI_2`/`SAN_SANG`) phải huỷ hoặc chọn lại đội hình; loại `DI_AI_CUNG_NHAU` bị khoá. |
| `nhat_ky_luot_danh` | Field mới chỉ có ở trận mới, không backfill. |
| `class` (v2.1.0) | Thêm `phan_loai DEFAULT 'THUONG'`, `ten_co_dinh`/`ngoai_hinh_co_dinh`/`goi_y_phan_bo`/`goi_y_ky_nang` (`NULL`) cho toàn bộ Class hiện có — không đổi hành vi (mọi Class cũ vẫn `THUONG`, không tự thành Linh Thần). |
| `nhan_vat` (v2.1.0) | Thêm `tier DEFAULT 'B'` cho toàn bộ nhân vật hiện có — **không roll lại** (roll chỉ xảy ra lúc tạo mới, mục 0.8.6.A); coi như "đã roll ra B" để không cấp lợi thế hồi tố. Không ảnh hưởng build/chỉ số đang dùng nếu Dev Mode chưa seed `he_so_tier` khác 1.00 cho B. |
| `nguoi_choi` (v2.1.0) | Bỏ yêu cầu `ten_dang_nhap`/`mat_khau_hash` (chuyển `NULL`, cột cũ giữ lại không xoá để không phá foreign key lịch sử nếu có); tài khoản cũ (nếu từng seed thử) không tự chuyển thành phiên ẩn danh — chỉ áp dụng cho phiên PvP tạo mới sau khi deploy (ADR-10). |
| `phong_choi`/`man_choi`/`tien_do_di_ai` (v2.1.0→v2.2.0) | Thêm `che_do_tier DEFAULT 'CAN_BANG'` (phòng), `huong_hoa_first_clear DEFAULT 0` (màn — màn cũ = 0 Hương Hỏa cho tới khi Dev seed số liệu mục 0.8.6.F). `muc_tieu_phu`/`muc_tieu_da_nhan` (từng thêm ở v2.1.0) đã **bỏ hẳn** ở v2.2.0 trước khi phát hành — không cần migration riêng vì tính năng chưa từng chạy production. Không cấp Hương Hỏa hồi tố cho màn đã `da_hoan_thanh = true` từ trước khi cột mới seed số liệu — tự nhiên đúng vì invariant 0.8.6.E chỉ cho phép `false→true` đúng 1 lần. |
| `nguoi_choi_local.da_nhan_trieu_hoi_khoi_dau` | Thêm `DEFAULT false` cho mọi local player hiện có. Không tự cấp gói hồi tố; chỉ player chưa từng nhận sau khi build v2.4.0 mới thấy nút gói khởi đầu. |
| `class.la_hero_preset` | Thêm `DEFAULT false`; seed 20 Hero preset với `true`, đồng thời seed `ten_co_dinh`/`ngoai_hinh_co_dinh` cho Hero. Không tự biến Class cũ thành Hero. |
| `nhan_vat.tier`/Hero preset | Không reroll nhân vật cũ. Hero mới từ gacha/Hương Hỏa dùng tier seed cố định. Nhân vật tự tạo tiếp tục roll B/A/S. |
| `vi_huong_hoa`/`cau_hinh_he_thong` (v2.1.0→v2.4.0) | Bảng mới — mọi `nguoi_choi_local` hiện có được khởi tạo `so_du = 0, linh_than_da_mo = []`; `cau_hinh_he_thong` seed đúng 1 dòng theo mục 0.7.13b, gồm chi phí Hero và cấu hình gói gacha. |
| `noi_tai_class`/`ky_nang` (v2.3.0) | Thêm `dac_trung_rieng DEFAULT false` cho toàn bộ bản ghi hiện có. Class `LINH_THAN` đã seed từ v2.1.0/v2.2.0 (nếu có) phải được Dev gắn `true` cho ít nhất 1 skill/Nội tại **trước khi** chuyển `HOAT_DONG` ở lần publish kế tiếp sau khi deploy v2.3.0 — nếu chưa gắn, hard block ở mục 3.5 sẽ tự động chặn mọi lần publish tiếp theo của Class đó (không chặn các Class đã `HOAT_DONG` từ trước tới khi Dev chủ động sửa lại, tránh gãy nội dung đang chạy giữa chừng). |
| `cau_hinh_he_thong.he_so_tier` (v2.3.0) | Cập nhật 6 giá trị từ bảng cũ (`0.92/1.00/1.05/1.10/1.16/1.30`) sang bảng mới (`0.94/1.00/1.04/1.08/1.13/1.22`, mục 0.8.4.B) — áp dụng ngay cho trận **mới** bắt đầu sau khi Content Bundle mới được tải (mục 0.6a); trận đang snapshot dở giữ nguyên hệ số cũ tới khi kết thúc, đúng nguyên tắc snapshot bất biến. |

## 4.7 Gameplay Risk Assessment v1.8.0

Đây là đánh giá thiết kế, **không phải tuyên bố game chắc chắn vui** — chỉ playtest mới xác nhận được.

| Tiêu chí | Hướng tác động | Nhận định & rủi ro |
|---|---|---|
| Fun | Tăng tiềm năng | Nhiều quyết định hơn mỗi lượt (chọn target, bảo vệ/phản công). Rủi ro: 6 actor làm nhịp trận chậm nếu mỗi lượt phải nghĩ lâu. |
| Replayability | Tăng | Nguồn đến từ tổ hợp Class × Passive × Stat × Skill × đội hình, không cần tiến trình. Rủi ro: chỉ 4 Class seed thì đội hình lặp lại nhanh. |
| Strategic Depth | Tăng | Team composition, target priority, timing CC/cleanse. Rủi ro: nếu có "đội hình tối ưu" thì chiều sâu giả. |
| Agency | Tăng có điều kiện | Kháng CC, trần khiên, lưới auto-pass tách lý do. Rủi ro: cooldown-only vẫn chờ người chơi bỏ lượt (dead turn). |
| Counterplay | Tăng | Công cụ có sẵn + trần an toàn. Rủi ro: counterplay phụ thuộc chất lượng seed skill (thiếu heal/cleanse/shield lên đồng đội thì không có). |
| Build Diversity | Tăng vừa | 5 điểm/≤2 mỗi stat tạo biến thể nhỏ (±12% một stat). Rủi ro: chênh lệch quá nhỏ để người chơi cảm nhận; hoặc có stat luôn tối ưu nếu hệ số lệch. |
| Team Synergy | Tăng | Đến từ dữ liệu, không hard-code. Rủi ro: synergy chỉ xuất hiện nếu skill nhắm đồng đội đủ phong phú. |
| PvP Potential | Tăng | Đội hình 1–3 giảm hard counter so với 1v1 cố định, đồng thời vẫn cho phép trận nhanh (1v1) khi người chơi muốn. Rủi ro: thời gian chờ đối thủ (90s/lượt, tối đa 3 actor/người) và disconnect ảnh hưởng cả đội; đội lệch quân số (1v3) có thể lệch cân bằng — CẦN PLAYTEST, không tự thêm handicap. |
| PvE Potential | Tăng | Encounter đa dạng bằng thành phần đội AI. Rủi ro: AI scoring khởi điểm có thể lộ điểm yếu dễ khai thác. |
| Match Clarity | Giảm nguy cơ nếu UI tốt | 6 actor, nhiều status. Cần layout ALLY/ENEMY + panel actor + `lua_chon_hop_le` + dự báo ATB. |
| Balance Risk | Tăng | Nhiều hằng số khởi điểm (hệ số quy đổi, trần lượt, trọng số AI). Cần Sandbox AI-vs-AI trước playtest. |
| Complexity | Tăng (đã kiềm chế) | Không thêm effect/tiến trình; thêm ~6 quy tắc an toàn (0.13.3). Rủi ro: dev phải hiểu và test đủ các invariant. |
| Retention Potential | Chưa xác định | Không có tiến trình/xếp hạng có chủ đích; giữ chân phụ thuộc vào chiều sâu combat và nội dung — cần đo, chưa thể kết luận. |

## 4.8 Danh sách nên playtest (ưu tiên)

0. **Triệu Hồi Khởi Đầu:** người chơi có hiểu đây là gói miễn phí 1 lần không; 10 Hero có làm roster ban đầu quá rộng không; tỉ lệ S/SS có tạo cảm giác hào phóng nhưng vẫn còn lý do chơi PvE không.
0.1. **Hương Hỏa vs Hero vs Linh Thần:** người chơi có hiểu quyết định "mua Hero 15–80" đồng nghĩa trì hoãn Linh Thần 300 không; giá SS=80 có làm S/SS chênh quá ít/nhiều không.


1. Hệ số quy đổi Stat Allocation: có stat nào luôn được chọn/không bao giờ được chọn không (Build Diversity).
2. Trần lượt liên tiếp (2/3) và trần gauge: có kích hoạt trong trận thật không; có gây cảm giác "actor đầy gauge mà không được đi" không.
3. Kháng CC 2 lượt và `so_luot ≤ 2`: CC có còn đủ giá trị để đáng build không.
4. Trần khiên 50%: focus fire có còn dễ chết-trước-khi-hành-động không (Dead-before-acting).
5. DOT/HOT đếm theo lượt toàn trận với 6 actor: có quá ngắn không.
6. `GIOI_HAN_HANH_DONG = 150`: có bao giờ chạm tới; thời lượng trận 3–7 phút.
7. Trọng số AI theo archetype: có hành vi ngớ ngẩn hoặc quá dễ khai thác không.
8. Skill AOE / `TAT_CA_*`: hệ số khuyến nghị 40–50% có đủ cân bằng không.
9. Dead turn khi mọi skill cooldown (không auto-pass): có cần auto-pass riêng không.
10. Nhịp trận PvP: 90 giây/lượt × nhiều actor; nhu cầu surrender.
11. **(Final Patch)** Cân bằng đội hình lệch quân số (1v3, 3v1, 2v3...): đội ít actor hơn có tỉ lệ thắng thấp bất thường không so với đội đông hơn cùng tổng chỉ số — nếu có, đây là câu hỏi cân bằng nội dung/seed dữ liệu, không phải lý do thêm handicap vào engine.

## 4.9 Phân loại quyết định kiến trúc còn mở (v1.9.0 — audit lại toàn bộ NEEDS REVIEW của v1.8.0, phân loại A/B/C theo yêu cầu final audit)

> Nguyên tắc phân loại: **A = engineering tự chốt được, đã chốt ở patch này**; **B = phụ thuộc quyết định sản phẩm thật, giữ `NEEDS PRODUCT DECISION` nhưng có default rõ để không chặn implementation**; **C = ngoài phạm vi v1.8.x, ghi rõ out-of-scope**. Không còn mục nào bị bỏ ngỏ mà thiếu default hành vi.

1. **[A] — SUPERSEDED ở v2.1.0, đã chốt (ADR-02, ADR-08).** Liên kết nhân vật local ↔ tài khoản online: quyết định "hai hồ tách biệt" của v1.9.0/v2.0.x bị **thay thế** — v2.1.0 dùng **một roster duy nhất** ở local, PvP nhận **bản khai nhân vật** (không phải tham chiếu) và chỉ xác thực tính hợp lệ, không xác thực sở hữu (mục 2.2). Đây không còn là product decision bỏ ngỏ.
2. **[A] — Đã chốt, không còn NEEDS REVIEW.** Nhiều thiết bị cho cùng một người chơi PvE: `nguoi_choi_local_id` sinh theo thiết bị, không có cloud sync ở v1.8.x — đổi máy/cài lại app mất tiến trình PvE local. Đây là hệ quả tất yếu của quyết định kiến trúc "PvE không cần tài khoản/server" (mục 0.2), không phải một câu hỏi cần sản phẩm quyết thêm — nếu muốn tránh đánh đổi này thì phải từ bỏ chính yêu cầu gốc "PvE offline, zero operating cost", nên không có phương án thứ hai để hỏi. Cloud sync tự nguyện (không bắt buộc) cho PvE vẫn có thể thêm sau như một tính năng riêng — xem mục 4.7 (Future Roadmap).
3. **[A] — Đã chốt ở mục 0.6a (ADR-03).** Cơ chế đóng gói Content Bundle: format JSON, versioning bằng số nguyên tăng dần, integrity bằng SHA-256, tải khi có mạng ở Menu chính, không đổi content giữa trận. Không còn là câu hỏi mở.
4. **[C] Ngoài phạm vi v1.8.x.** PvP ẩn danh (không cần tài khoản bền vững): giữ nguyên quyết định từ v1.0 rằng PvP dùng tài khoản `nguoi_choi` (username/password). Đổi sang PvP ẩn danh theo phòng là một thay đổi mô hình tài khoản riêng, không liên quan tới 2 vấn đề kiến trúc Offline/Online đang xử lý — ghi nhận ở mục 4.7 (Future Roadmap) nếu muốn xem xét sau, không xử lý ở đây.

Sau phân loại này, **không còn mục nào trong 4.9 thiếu default hành vi** — mục 1 là product decision thật (ảnh hưởng trải nghiệm người chơi trực tiếp, không phải chi tiết kỹ thuật), còn lại đã có quyết định kỹ thuật rõ ràng.
