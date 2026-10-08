import { HERO_PRESETS, LINH_THAN_PRESETS } from "../engine/progression.js";
import type { ActorContentSnapshot, ChiSoNen, DauVaoNhanVat, HieuUngCauHinh, KyNangSnapshot, NoiTaiSnapshot, PhanBoDiem, Tier } from "../engine/types.js";

export type ClassContent = {
  class_id: string; class_ma: string; ten_class: string; phan_loai: "THUONG" | "LINH_THAN"; la_hero_preset: boolean;
  ten_co_dinh?: string; tier?: Tier; tier_seed?: "B" | "A" | "S" | "SS"; archetype: Archetype;
  design_intent: string; content_status: "CONTENT_OFFICIAL" | "DEV_DRAFT";
  appearance_status: "PLACEHOLDER_ART"; stats: ChiSoNen; skills: KyNangSnapshot[]; passive: NoiTaiSnapshot;
};
export type Archetype = "TANK" | "BRUISER" | "PHYSICAL_DPS" | "MAGIC_DPS" | "SUPPORT" | "CONTROL" | "HYBRID";

/** Archetype baselines are raw engine inputs. Tier scaling remains solely in Shared Combat Engine. */
export const ARCHETYPE_BASELINES: Record<Archetype, ChiSoNen> = {
  TANK: { hp_nen: 420, atk_nen: 58, def_nen: 72, spd_nen: 88, mp_nen: 50, mp_hoi_moi_luot: 5 },
  BRUISER: { hp_nen: 370, atk_nen: 82, def_nen: 55, spd_nen: 98, mp_nen: 50, mp_hoi_moi_luot: 5 },
  PHYSICAL_DPS: { hp_nen: 300, atk_nen: 108, def_nen: 38, spd_nen: 105, mp_nen: 45, mp_hoi_moi_luot: 5 },
  MAGIC_DPS: { hp_nen: 310, atk_nen: 101, def_nen: 40, spd_nen: 100, mp_nen: 70, mp_hoi_moi_luot: 6 },
  SUPPORT: { hp_nen: 350, atk_nen: 66, def_nen: 52, spd_nen: 98, mp_nen: 65, mp_hoi_moi_luot: 7 },
  CONTROL: { hp_nen: 325, atk_nen: 76, def_nen: 48, spd_nen: 104, mp_nen: 60, mp_hoi_moi_luot: 6 },
  HYBRID: { hp_nen: 340, atk_nen: 84, def_nen: 48, spd_nen: 100, mp_nen: 55, mp_hoi_moi_luot: 5 },
};

type EffectCode = HieuUngCauHinh["ma_hieu_ung"];
const effect = (ma_hieu_ung: EffectCode, tham_so: Record<string, number>, doi_tuong: HieuUngCauHinh["doi_tuong"]): HieuUngCauHinh => ({ ma_hieu_ung, tham_so, doi_tuong, thoi_diem: "KHI_THI_TRIEN" });
const profileEffects: Array<(i: number) => HieuUngCauHinh> = [
  (i) => effect("EFF_DMG_DIRECT", { he_so: 0.85 + (i % 4) * 0.08 }, "MOT_DICH"),
  (i) => effect("EFF_DMG_AOE", { he_so: 0.38 + (i % 3) * 0.06 }, "TAT_CA_DICH"),
  (i) => effect("EFF_SHIELD", { luong_hap_thu: 45 + (i % 4) * 10 }, "BAN_THAN"),
  (i) => effect("EFF_HEAL", { gia_tri: 0.1 + (i % 4) * 0.03 }, "MOT_DONG_DOI"),
  (i) => effect("EFF_STUN", { so_luot: 1 }, "MOT_DICH"),
  (i) => effect("EFF_SLOW", { phan_tram_giam: 0.12 + (i % 3) * 0.04, so_luot: 1 }, "MOT_DICH"),
  (i) => effect("EFF_BUFF_ATK", { gia_tri: 0.1 + (i % 3) * 0.05, so_luot: 2 }, "BAN_THAN"),
  (i) => effect("EFF_BUFF_DEF", { gia_tri: 0.12 + (i % 3) * 0.04, so_luot: 2 }, "MOT_DONG_DOI"),
  (i) => effect("EFF_DEBUFF_ATK", { gia_tri: 0.1 + (i % 3) * 0.05, so_luot: 2 }, "MOT_DICH"),
  (i) => effect("EFF_DEBUFF_DEF", { gia_tri: 0.12 + (i % 3) * 0.04, so_luot: 2 }, "MOT_DICH"),
  (i) => effect("EFF_DMG_DOT", { sat_thuong_moi_luot: 18 + (i % 4) * 3, so_luot: 2 }, "MOT_DICH"),
  (i) => effect("EFF_DMG_TRUE", { he_so: 0.65 + (i % 3) * 0.1 }, "MOT_DICH"),
  (i) => effect("EFF_ROOT", { so_luot: 1 }, "MOT_DICH"),
  (i) => effect("EFF_SILENCE", { so_luot: 1 }, "MOT_DICH"),
  (i) => effect("EFF_BUFF_SPD", { gia_tri: 0.12 + (i % 3) * 0.04, so_luot: 2 }, "MOT_DONG_DOI"),
  (i) => effect("EFF_HOT", { luong_moi_luot: 22 + (i % 4) * 4, so_luot: 2 }, "MOT_DONG_DOI"),
  () => effect("EFF_CLEANSE", { so_luong_go: 1 }, "MOT_DONG_DOI"),
  () => effect("EFF_DISPEL", { so_luong_go: 1 }, "MOT_DICH"),
  (i) => effect("EFF_LIFESTEAL", { phan_tram_hoi: 0.12 + (i % 3) * 0.04 }, "BAN_THAN"),
];
const passiveEffects: Array<(i: number) => HieuUngCauHinh> = [
  (i) => effect("EFF_SHIELD", { luong_hap_thu: 40 + (i % 5) * 8 }, "BAN_THAN"),
  (i) => effect("EFF_BUFF_ATK", { gia_tri: 0.08 + (i % 4) * 0.03, so_luot: 2 }, "BAN_THAN"),
  (i) => effect("EFF_BUFF_DEF", { gia_tri: 0.1 + (i % 4) * 0.03, so_luot: 2 }, "BAN_THAN"),
  (i) => effect("EFF_BUFF_SPD", { gia_tri: 0.08 + (i % 4) * 0.03, so_luot: 2 }, "BAN_THAN"),
  (i) => effect("EFF_HOT", { luong_moi_luot: 16 + (i % 5) * 4, so_luot: 2 }, "TAT_CA_DONG_DOI"),
  () => effect("EFF_CLEANSE", { so_luong_go: 1 }, "TAT_CA_DONG_DOI"),
];

const skill = (classId: string, name: string, desc: string, index: number, heroIndex: number, special = false): KyNangSnapshot => ({
  id: `${classId}:skill-${index + 1}`, ma_ky_nang: `${classId}-SKILL-${index + 1}`.toUpperCase().replace(/-/g, "_"), ten_hien_thi: name, mo_ta: desc, class_id: classId,
  hoi_chieu_luot: index === 0 ? 0 : 1 + ((heroIndex + index) % 3), chi_phi_mp: index === 0 ? 0 : 5 + ((heroIndex * 3 + index * 2) % 10),
  danh_sach_hieu_ung: [index === 0 ? profileEffects[0]!(heroIndex) : profileEffects[(heroIndex * 3 + index) % profileEffects.length]!(heroIndex + index)], trang_thai: "HOAT_DONG", ...(special ? { dac_trung_rieng: true } : {}),
});
const passive = (classId: string, name: string, desc: string, heroIndex: number, special = false): NoiTaiSnapshot => ({
  id: `${classId}:passive`, ma_noi_tai: `${classId}-PASSIVE`.toUpperCase().replace(/-/g, "_"), ten_hien_thi: name, mo_ta: desc, kich_hoat: "BAT_DAU_TRAN", dieu_kien: {},
  danh_sach_hieu_ung: [passiveEffects[heroIndex % passiveEffects.length]!(heroIndex + 2)], ...(special ? { dac_trung_rieng: true } : {}),
});

type HeroDefinition = { id: string; archetype: Archetype; intent: string; skillNames: [string,string,string,string,string,string]; skillDescs: [string,string,string,string,string,string]; passiveName: string; passiveDesc: string };
const heroDefinitions: HeroDefinition[] = [
  { id:"hero-thanh-giong", archetype:"PHYSICAL_DPS", intent:"Bùng nổ chiến đấu, tăng công rồi dồn đòn", skillNames:["Ngựa Sắt Xung Phong","Tre Ngà Quét Giặc","Áo Giáp Sắt","Vươn Vai Thành Tráng Sĩ","Đuổi Giặc Ân","Bay Về Trời"], skillDescs:["Đột kích một kẻ địch bằng thế xung phong.","Quét đội hình đối phương bằng bụi tre.","Tự tăng sức chống chịu trước khi áp sát.","Tăng công và tốc cho bản thân.","Đánh dồn vào mục tiêu đã suy yếu.","Tung đòn kết thúc đầy khí thế."], passiveName:"Càng đánh càng lớn", passiveDesc:"Khí thế chiến trận giúp Gióng mở đầu trận với sức tiến công." },
  { id:"hero-thach-sanh", archetype:"BRUISER", intent:"Kiếm pháp và sức mạnh diệt quái", skillNames:["Búa Rìu Khai Sơn","Niêu Cơm Thần","Đàn Kêu Oan Khuất","Cung Vàng Trừ Yêu","Chằn Tinh Gục Ngã","Thạch Sanh Trấn Thủ"], skillDescs:["Bổ rìu vào một đối thủ.","Hồi sức cho đồng minh đang bị thương.","Làm suy giảm thế công của kẻ địch.","Bắn một mũi tên xuyên giáp.","Đánh rộng để phá thế quái vật.","Dựng lá chắn bảo vệ bản thân."], passiveName:"Trái tim nghĩa hiệp", passiveDesc:"Bản lĩnh người diệt quái tạo thế thủ vững đầu trận." },
  { id:"hero-chu-dong-tu", archetype:"SUPPORT", intent:"Giao thương, duyên hội và hỗ trợ", skillNames:["Bến Sông Gặp Gỡ","Thuyền Rồng Sum Vầy","Gánh Hàng Qua Bến","Duyên Lành Tiên Dung","Chợ Hội Phồn Vinh","Về Với Bãi Tự Nhiên"], skillDescs:["Chủ động tiếp cận và đánh một địch thủ.","Tăng thủ cho một đồng minh.","Hồi máu cho đồng đội.","Thanh lọc một hiệu ứng bất lợi.","Tiếp sức cho đội bằng nhịp giao thương.","Duy trì sức bền cho cả hành trình."], passiveName:"Duyên lành hội tụ", passiveDesc:"Sự hòa hợp giúp đồng minh được che chở từ đầu trận." },
  { id:"hero-an-duong-vuong", archetype:"TANK", intent:"Thành Cổ Loa và nỏ thần phòng tuyến", skillNames:["Nỏ Thần Liên Châu","Thành Cổ Loa","Mũi Tên Lông Ngỗng","Hào Sâu Phòng Thủ","Lệnh Canh Cửa","Vọng Gác Âu Lạc"], skillDescs:["Bắn mũi nỏ chính xác vào một địch.","Tăng phòng thủ cho đồng minh.","Đánh xuyên giáp mục tiêu.","Tự dựng thế thủ vững chắc.","Giảm sức công của kẻ xâm nhập.","Giữ tuyến đầu bằng sức bền."], passiveName:"Lũy ốc kiên cố", passiveDesc:"Cổ Loa tạo lớp phòng bị cho nhà vua khi giao chiến." },
  { id:"hero-hung-vuong", archetype:"SUPPORT", intent:"Vua dựng nước, nâng đỡ cộng đồng", skillNames:["Trống Đồng Hiệu Triệu","Lễ Hội Mùa Mới","Bờ Cõi Văn Lang","Lệnh Vua Hùng","Con Rồng Cháu Tiên","Giỗ Tổ Hùng Vương"], skillDescs:["Hiệu triệu đồng minh tăng tốc.","Hồi phục cho đồng đội.","Gia cố phòng tuyến cả đội.","Làm giảm sức công một đối thủ.","Tăng tinh thần tiến công cho bản thân.","Thanh lọc bất lợi cho đồng minh."], passiveName:"Dựng nền Văn Lang", passiveDesc:"Nền móng quốc gia giúp đội hình nhập trận ổn định." },
  { id:"hero-tam", archetype:"SUPPORT", intent:"Biến đổi, hồi sinh và bền bỉ", skillNames:["Quả Thị Thơm","Hóa Chim Vàng Anh","Khung Cửi Oan Khiên","Cây Xoan Đào","Trở Lại Làm Người","Ngày Hội Nhà Vua"], skillDescs:["Hồi máu cho đồng đội bằng phép màu quả thị.","Tăng tốc cho bản thân để đổi thế.","Trói chân kẻ truy đuổi.","Tạo khiên bảo vệ một đồng minh.","Hồi sức theo thời gian cho đồng đội.","Thanh lọc một hiệu ứng bất lợi."], passiveName:"Không khuất phục", passiveDesc:"Tấm giữ được sức bền sau bao lần đổi thay." },
  { id:"hero-chu-cuoi", archetype:"CONTROL", intent:"Cây đa, cung và ánh trăng", skillNames:["Cành Đa Vươn Bóng","Cung Trăng Vằng Vặc","Gốc Đa Che Chở","Cuội Lên Cung Trăng","Bóng Trăng Mê Ảo","Chú Cuội Bắn Xa"], skillDescs:["Làm chậm kẻ địch bằng cành đa.","Bắn mục tiêu từ cung trăng.","Tự tạo lá chắn dưới bóng cây.","Trói chân một đối thủ.","Giảm công địch trong ánh trăng.","Bắn loạt tên vào đội hình đối phương."], passiveName:"Bóng đa đầu trận", passiveDesc:"Cây đa cổ thụ che chở Cuội ngay khi giao chiến." },
  { id:"hero-coc", archetype:"CONTROL", intent:"Cóc kiện trời và tiếng gọi mưa", skillNames:["Cóc Nghiến Răng","Trống Sấm Kêu Oan","Cáo Đánh Tiền Quân","Gấu Chặn Hậu Quân","Mưa Trút Xuống","Cóc Kiện Trời"], skillDescs:["Cóc lao tới cắn một kẻ địch.","Làm choáng bằng tiếng sấm gọi trời.","Giảm sức công của mục tiêu.","Trói chân kẻ địch đang áp sát.","Gọi mưa gây sát thương diện rộng.","Dồn áp lực lên toàn bộ đối thủ."], passiveName:"Đoàn quân kiện trời", passiveDesc:"Khí thế đoàn kết mở đầu trận với thế công mạnh." },
  { id:"hero-ong-tao", archetype:"SUPPORT", intent:"Bếp lửa, gia đạo và báo tin trời", skillNames:["Bếp Hồng Ấm Nhà","Cá Chép Vượt Vũ Môn","Táo Quân Chầu Trời","Giữ Lửa Gia Đình","Mâm Cơm Sum Họp","Bản Tấu Cuối Năm"], skillDescs:["Hồi phục đồng minh bằng hơi ấm bếp lửa.","Tăng tốc cho đồng đội.","Giải trừ một hiệu ứng có lợi của địch.","Tạo khiên cho một đồng minh.","Hồi máu theo thời gian cho đội.","Làm giảm công đối thủ."], passiveName:"Bếp lửa sum vầy", passiveDesc:"Ngọn lửa gia đình tiếp sức cho đội lúc vào trận." },
  { id:"hero-my-chau", archetype:"SUPPORT", intent:"Lông ngỗng, thành quách và lòng tin", skillNames:["Lông Ngỗng Chỉ Đường","Cửa Thành Mở Lối","Dấu Vết Trên Đường","Nỏ Thần Trong Tay","Lời Hẹn Mỵ Châu","Bài Học Cảnh Giác"], skillDescs:["Tăng tốc cho một đồng minh.","Tăng phòng thủ cho bản thân.","Làm chậm mục tiêu lần theo dấu vết.","Đánh một kẻ địch bằng nỏ thần.","Hồi phục một đồng đội.","Giảm công kẻ địch để bảo vệ đội."], passiveName:"Dấu lông ngỗng", passiveDesc:"Dấu vết giúp Mỵ Châu nhận biết hiểm nguy từ đầu trận." },
  { id:"hero-trong-thuy", archetype:"CONTROL", intent:"Thủy chiến, gián điệp và mưu kế", skillNames:["Sóng Ngầm Cổ Loa","Tin Giả Đưa Về","Mật Ước Hai Nước","Thủy Triều Áp Bờ","Đánh Lạc Hướng","Mưu Kế Trọng Thủy"], skillDescs:["Đánh trực diện một mục tiêu.","Làm câm lặng kẻ địch bằng tin nhiễu.","Giảm phòng thủ của đối thủ.","Làm chậm cả đội hình địch.","Giải trừ một lớp bảo vệ đối phương.","Gây sát thương theo thời gian."], passiveName:"Mưu đồ dưới sóng", passiveDesc:"Thế cờ kín đáo làm suy yếu tuyến đối phương." },
  { id:"hero-tien-dung", archetype:"SUPPORT", intent:"Tiên Dung, lòng nhân và cuộc gặp bên sông", skillNames:["Màn Sương Bãi Tự Nhiên","Lời Mời Hội Ngộ","Tấm Lòng Từ Tâm","Thuyền Buôn Sum Vầy","Duyên Tiên Hạ Giới","Tiên Dung Chở Che"], skillDescs:["Làm chậm đối thủ trong màn sương.","Tăng tốc cho đồng minh.","Hồi máu cho một đồng đội.","Tăng phòng thủ một đồng minh.","Thanh lọc hiệu ứng xấu.","Hồi máu theo thời gian cho đội."], passiveName:"Tấm lòng rộng mở", passiveDesc:"Sự nhân hậu giúp Tiên Dung giữ vững tinh thần đầu trận." },
  { id:"hero-so-dua", archetype:"HYBRID", intent:"Tiếng sáo, thân phận và tài nghệ", skillNames:["Tiếng Sáo Đồng Quê","Hóa Thân Tuấn Tú","Chăn Trâu Qua Bãi","Sọ Dừa Tài Nghệ","Cầu Hôn Công Chúa","Đỗ Trạng Nguyên"], skillDescs:["Tiếng sáo làm chậm một kẻ địch.","Tăng công cho bản thân.","Đánh thường vào một mục tiêu.","Hồi phục cho đồng đội.","Giảm công kẻ cản đường.","Tạo lá chắn nhờ ý chí và tài năng."], passiveName:"Tài năng ẩn mình", passiveDesc:"Sọ Dừa giữ sức bền và chờ thời cơ bộc lộ." },
  { id:"hero-mai-an-tiem", archetype:"PHYSICAL_DPS", intent:"Đảo hoang, dưa đỏ và ý chí tự lực", skillNames:["Hạt Dưa Đỏ","Vượt Sóng Ra Đảo","Khai Hoang Bãi Cát","Mùa Dưa Bội Thu","Thuyền Buôn Trở Lại","Ý Chí An Tiêm"], skillDescs:["Ném hạt dưa gây sát thương lên địch.","Làm chậm kẻ đuổi theo.","Tăng công trong lúc khai phá.","Gây sát thương theo thời gian.","Hút lại sinh lực sau đòn đánh.","Dồn đòn kết liễu đối thủ."], passiveName:"Tự lực nơi hoang đảo", passiveDesc:"Kinh nghiệm sinh tồn tăng sức bền đầu trận." },
  { id:"hero-lang-lieu", archetype:"SUPPORT", intent:"Bánh chưng, bánh dày và lòng hiếu thảo", skillNames:["Bánh Chưng Đất Mẹ","Bánh Dày Trời Cao","Mâm Lễ Sum Vầy","Nếp Thơm Nuôi Quân","Lễ Vật Dâng Vua","Lòng Hiếu Lang Liêu"], skillDescs:["Tạo khiên cho đồng minh.","Hồi máu cho một đồng đội.","Tăng phòng thủ cho cả đội.","Hồi máu theo thời gian.","Thanh lọc một hiệu ứng xấu.","Tiếp thêm sức tiến công cho bản thân."], passiveName:"Lễ vật từ lòng hiếu", passiveDesc:"Sự chân thành mang đến lớp bảo hộ đầu trận." },
  { id:"hero-anh-khoai", archetype:"BRUISER", intent:"Cây tre trăm đốt và trí khôn người làm", skillNames:["Khúc Tre Thứ Nhất","Khắc Nhập Khắc Xuất","Trăm Đốt Hợp Thành","Lời Phú Ông","Tre Trăm Đốt Quật Ngã","Anh Khoai Bền Chí"], skillDescs:["Đánh bằng khúc tre vào một đối thủ.","Trói chân kẻ địch bằng câu thần chú.","Quét tre trúng cả đội hình địch.","Giảm công kẻ lừa lọc.","Tăng công để phản kích.","Dựng thế thủ vững vàng."], passiveName:"Người ngay có phép lành", passiveDesc:"Sự kiên trì tạo lợi thế phòng bị đầu trận." },
  { id:"hero-cau-be-thong-minh", archetype:"CONTROL", intent:"Ứng đối câu đố bằng trí tuệ", skillNames:["Đối Đáp Sứ Giả","Câu Đố Cánh Đồng","Đếm Trâu Tính Ruộng","Thử Tài Quan Lớn","Lời Đáp Sắc Sảo","Cậu Bé Giải Đố"], skillDescs:["Đánh vào sơ hở của một đối thủ.","Làm câm lặng địch bằng câu đố.","Giảm phòng thủ mục tiêu sau khi tính toán.","Trói chân kẻ địch đang lúng túng.","Tăng tốc để đi trước một bước.","Gây sát thương diện rộng bằng đáp án bất ngờ."], passiveName:"Mưu trí ứng biến", passiveDesc:"Trí tuệ giúp cậu bé chủ động nhịp độ giao tranh." },
  { id:"hero-trang-quynh", archetype:"CONTROL", intent:"Trào lộng, ứng đối và lật thế cờ", skillNames:["Bút Mực Trạng Quỳnh","Đòn Trả Lời Hóm Hỉnh","Món Ăn Dâng Chúa","Câu Đố Cung Đình","Lật Tẩy Kẻ Quyền Thế","Trạng Quỳnh Châm Biếm"], skillDescs:["Ném mực gây sát thương trực tiếp.","Làm chậm kẻ đang bị chọc tức.","Giảm công mục tiêu bằng đòn trào lộng.","Làm câm lặng đối thủ bằng câu đố.","Giải trừ một hiệu ứng có lợi của địch.","Tấn công cả đội đối phương bằng màn ứng đối."], passiveName:"Tiếng cười châm biếm", passiveDesc:"Sự lanh trí làm đối thủ mất thế chủ động." },
  { id:"hero-nang-to-thi", archetype:"TANK", intent:"Thủy chung hóa đá, bền lòng chờ đợi", skillNames:["Đứng Trên Đỉnh Núi","Hóa Đá Chờ Chồng","Gió Núi Miền Biên","Tượng Đá Bất Khuất","Nỗi Chờ Qua Tháng","Nàng Tô Thị Vững Lòng"], skillDescs:["Đánh mạnh vào một kẻ địch.","Tăng phòng thủ bản thân.","Làm chậm đối phương bằng gió núi.","Tạo khiên vững như tượng đá.","Giảm công kẻ tấn công.","Giữ sức bền trong cuộc giao tranh dài."], passiveName:"Tượng đá thủy chung", passiveDesc:"Lòng bền bỉ tạo lớp phòng bị ngay đầu trận." },
  { id:"linh-than-lac-long-quan", archetype:"BRUISER", intent:"Rồng biển, thủy vực và bảo hộ", skillNames:["Long Vương Trấn Hải","Sóng Rồng Dâng Bờ","Con Rồng Cháu Tiên","Thủy Phủ Che Chở","Rồng Thiêng Quật Sóng","Lạc Long Quân Hộ Quốc"], skillDescs:["Long lực đánh trúng một đối thủ.","Sóng rồng gây áp lực toàn đội địch.","Tăng công cho bản thân.","Tạo khiên cho đồng minh.","Làm chậm kẻ địch bằng thủy triều.","Đòn bảo hộ dồn lực vào mục tiêu."], passiveName:"Dòng giống Rồng Tiên", passiveDesc:"Long khí hộ quốc tạo thế chống chịu riêng của Linh Thần.", },
  { id:"linh-than-au-co", archetype:"SUPPORT", intent:"Tiên tổ, sinh thành và che chở", skillNames:["Bọc Trăm Trứng","Tiên Khí Sinh Thành","Đàn Chim Tiên","Mẹ Âu Cơ Chở Che","Hồng Lĩnh Tụ Linh","Âu Cơ Truyền Dưỡng"], skillDescs:["Hồi phục một đồng minh.","Hồi máu theo thời gian cho đội.","Tăng tốc đồng minh.","Tạo khiên cho một người con.","Thanh lọc hiệu ứng xấu.","Hồi phục đội bằng linh khí tiên tổ."], passiveName:"Mẹ Tiên sinh thành", passiveDesc:"Tiên khí nâng đỡ sinh lực toàn đội từ đầu trận.", },
  { id:"linh-than-son-tinh", archetype:"TANK", intent:"Núi cao, địa hình và phòng thủ", skillNames:["Dời Non Lấp Bể","Thành Lũy Núi Cao","Đá Núi Trấn Yểm","Rừng Thiêng Che Phủ","Địa Mạch Vững Bền","Sơn Tinh Ngự Núi"], skillDescs:["Đá núi đánh mạnh vào mục tiêu.","Tăng thủ cho đồng minh.","Làm chậm địch bằng địa hình hiểm trở.","Tạo khiên cho bản thân.","Giảm công đối thủ đang áp sát.","Tấn công diện rộng bằng sạt núi."], passiveName:"Chúa núi bất động", passiveDesc:"Địa mạch tạo phòng tuyến riêng cho Linh Thần.", },
  { id:"linh-than-thuy-tinh", archetype:"CONTROL", intent:"Nước dâng, áp lực và khống chế", skillNames:["Đại Hồng Thủy","Sóng Thần Cuộn Trào","Mưa Nguồn Tích Tụ","Nước Xoáy Trói Chân","Thủy Áp Bào Mòn","Thủy Tinh Dâng Sóng"], skillDescs:["Nước lũ đánh tràn đội hình địch.","Làm chậm đối thủ bằng sóng lớn.","Gây sát thương theo thời gian như nước dâng.","Trói chân một địch thủ.","Giảm phòng thủ mục tiêu dưới áp lực nước.","Tấn công trực diện bằng thủy lực."], passiveName:"Thủy triều không ngừng", passiveDesc:"Áp lực nước làm suy yếu thế trận đối thủ từ đầu trận.", },
];

const baselineAllocation: PhanBoDiem = { hp: 1, atk: 1, def: 1, spd: 1, mp: 1, mp_hoi: 0 };
export const DEFAULT_ALLOCATION = baselineAllocation;
export const HERO_CLASSES: ClassContent[] = HERO_PRESETS.map((hero, i) => {
  const def = heroDefinitions.find((row) => row.id === hero.class_id)!;
  return { class_id: hero.class_id, class_ma: hero.ma_class, ten_class: hero.ten_co_dinh, ten_co_dinh: hero.ten_co_dinh, tier: hero.tier, tier_seed: hero.tier, phan_loai: "THUONG", la_hero_preset: true,
    archetype: def.archetype, design_intent: def.intent, content_status: "CONTENT_OFFICIAL", appearance_status: "PLACEHOLDER_ART", stats: { ...ARCHETYPE_BASELINES[def.archetype] },
    skills: def.skillNames.map((name, index) => skill(def.id, name, def.skillDescs[index], index, i)), passive: passive(def.id, def.passiveName, def.passiveDesc, i) };
});
export const LINH_THAN_CLASSES: ClassContent[] = LINH_THAN_PRESETS.map((god, i) => {
  const def = heroDefinitions.find((row) => row.id === god.class_id)!;
  return { class_id: god.class_id, class_ma: god.class_id.replace(/-/g, "_").toUpperCase(), ten_class: god.ten_co_dinh, ten_co_dinh: god.ten_co_dinh, tier: "SSS", phan_loai: "LINH_THAN", la_hero_preset: false,
    archetype: def.archetype, design_intent: def.intent, content_status: "CONTENT_OFFICIAL", appearance_status: "PLACEHOLDER_ART", stats: { ...ARCHETYPE_BASELINES[def.archetype] },
    skills: def.skillNames.map((name, index) => skill(def.id, name, def.skillDescs[index], index, i + 19, index === 5)), passive: passive(def.id, def.passiveName, def.passiveDesc, i + 19, true) };
});
export const CLASS_CONTENT = { heroes: HERO_CLASSES, linh_than: LINH_THAN_CLASSES };
export const PLAYABLE_CLASSES: ClassContent[] = [...HERO_CLASSES, ...LINH_THAN_CLASSES];
export function classContent(classId: string): ClassContent | undefined { return PLAYABLE_CLASSES.find((content) => content.class_id === classId); }

export function makeActorInput(character: LocalCharacter, control: "NGUOI_CHOI" | "AI", ownerId: string | null): DauVaoNhanVat {
  const content = classContent(character.class_id); if (!content) throw new Error(`Thiếu content cho Class ${character.class_id}.`);
  const selectedSkills = character.skill_ids.map((id) => content.skills.find((skillRow) => skillRow.id === id)).filter((row): row is KyNangSnapshot => Boolean(row));
  if (!selectedSkills.length) throw new Error(`Nhân vật ${character.name} chưa có skill khả dụng.`);
  return { nhan_vat_id: character.id, nguoi_choi_id: control === "NGUOI_CHOI" ? ownerId : null, ten_hien_thi: character.name, class_id: content.class_id, class_ma: content.class_ma, ten_class: content.ten_class,
    phan_loai: content.phan_loai, la_hero_preset: content.la_hero_preset, ten_co_dinh: content.ten_co_dinh, ngoai_hinh_co_dinh: character.appearance,
    chi_so_nen: content.stats, tier: character.tier, tier_seed: content.tier_seed, phan_bo_diem: character.allocation, ky_nang: selectedSkills, noi_tai: content.passive, dieu_khien: control, ai_archetype: character.ai_archetype };
}
export type LocalCharacter = { id: string; class_id: string; la_hero_preset: boolean; tier: Tier; name: string; allocation: PhanBoDiem; skill_ids: string[]; appearance: { gender: "NAM" | "NU"; skin: string; style: string }; ai_archetype?: "AGGRESSIVE" | "CONTROL" | "DEFENSIVE" | "ADAPTIVE" };
export const DEFAULT_SKILL_IDS = (classId: string): string[] => classContent(classId)?.skills.slice(0, 4).map((row) => row.id) ?? [];
export function createPresetCharacter(hero: { class_id: string; ten_co_dinh: string; tier: "B" | "A" | "S" | "SS" }, id: string): LocalCharacter {
  return { id, class_id: hero.class_id, la_hero_preset: true, tier: hero.tier, name: hero.ten_co_dinh, allocation: { ...baselineAllocation }, skill_ids: DEFAULT_SKILL_IDS(hero.class_id), appearance: { gender: "NAM", skin: "placeholder-skin-1", style: "PLACEHOLDER_ART" } };
}
