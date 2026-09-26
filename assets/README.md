# PHƯỢNG CHICK ENGLISH WULIN — bộ asset hình ảnh

Bộ này phục vụ **visual vertical slice của 1 Unit demo** theo GDD v1.0. Ảnh gốc nằm trong `source/`; file đã cắt, chuẩn hóa kích thước và đặt tên để nạp vào Phaser nằm trong `game/`. `manifest.json` liệt kê đường dẫn, kích thước, điểm neo và thứ tự frame.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `game/characters/player` | Hai avatar gốc và sheet tĩnh 4 hướng `down, up, left, right` |
| `game/characters/npc` | Lão Ngư Phu, thương nhân phụ, Bang Chủ và bốn Hộ Pháp (mỗi người có sprite và portrait) |
| `game/characters/enemies` | Kiếm đồ, hắc khí yêu ma, kiếm đồ tinh anh |
| `game/characters/bosses` | Năm Boss có tên trong GDD |
| `game/world/landmarks` | Sơn Môn, Tàng Kinh Các, Trúc Lâm, Ma Giáo Cấm Địa |
| `game/world/ground` | Nền sân đá và đường đất 256×256 |
| `game/world/props` | Phong ấn, cọc luyện công, đèn lồng |
| `game/items` | Anh Ngữ Bí Điển, kiếm khởi đầu, rương thưởng, ngọc bội |
| `game/combat` | Nền đấu trường 1280×720 |
| `game/ui` | Icon HUD, panel 9-slice, joystick và nút đánh |
| `game/vfx` | Tia trúng đòn, critical, hào quang nhiệm vụ |
| `references` | Ảnh phong cách và bản GDD do bạn cung cấp |

Bang Chủ và bốn Hộ Pháp Đặng Trần Hà, Hoàng Vân, Phương Tú, Nguyệt Nguyễn đã có ảnh nhận diện và hai asset/người. Hộ Pháp Liên Phạm còn chờ ảnh mặt thật; xem [NHAN_VAT_CHO_ANH_THAM_CHIEU.md](NHAN_VAT_CHO_ANH_THAM_CHIEU.md).

## Dùng trong game

- Sprite nhân vật và vật phẩm là PNG nền trong suốt. Dùng `origin` trong manifest để đặt chân nhân vật lên vị trí map. Khi di chuyển, chọn frame theo hướng hoặc nạp `*_4dir.png` với frame 160×192.
- Sprite 4 hướng là **pose tĩnh**, chưa phải animation walk/attack/hit/death. Có thể dùng ngay cho movement prototype; animation hoàn chỉnh cần bộ frame bổ sung.
- Hai nền đất được tạo bằng AI theo yêu cầu tileable. Kiểm tra lặp 2×2 cho thấy sân đá còn thấy nhịp lặp ở đường nối; cần retouch trước khi phủ map lớn. Nền đất rừng ít lộ hơn.
- Các landmark là ảnh đơn. Collision polygon, interactive zones, map layout và foreground masking cần đặt trong Tiled/Phaser.
- UI icon/panel/VFX là file PNG tạo từ hình học để giữ cạnh sắc ở kích thước nhỏ. Panel dùng margin 24 px cho 9-slice.
- Ảnh nguồn có độ phân giải cao và tiện để tạo biến thể sau này. Asset game được thu nhỏ để tải nhanh hơn trên mobile.

Ví dụ nạp avatar bốn hướng trong Phaser 3:

```ts
this.load.spritesheet('playerMale', 'assets/game/characters/player/directional/male_4dir.png', {
  frameWidth: 160,
  frameHeight: 192,
});
// frame 0: down, 1: up, 2: left, 3: right
const player = this.add.sprite(x, y, 'playerMale', 0).setOrigin(0.5, 0.94);
```

GDD chưa chốt chủ đề và bố cục của toàn bộ 30 Unit, nên bộ này tập trung vào 1 map/Unit demo và hệ thống hình ảnh dùng lại. Hình Hộ Pháp Liên Phạm, bản đồ 30 Unit, cutscene, trang phục tùy biến, animation đầy đủ và audio chưa nằm trong bộ này.

## Nguồn phong cách

Định hướng chung là fantasy kiếm hiệp điện ảnh, áo nhiều lớp và thêu chi tiết. Bốn Hộ Pháp mới theo yêu cầu cập nhật: cảm hứng trang phục và họa tiết Việt Nam (áo ngũ thân/áo tứ thân, hoa sen, tre, Đông Sơn), tuyệt đối không dùng chữ Hán hoặc bối cảnh Trung Hoa. Portrait/sprite của Bang Chủ và bốn Hộ Pháp dùng ảnh mặt thật do người dùng cung cấp để giữ nhận diện. Ảnh mặt thật gốc không được chép vào thư mục asset phát hành. Prompt tạo ảnh nằm trong [PROMPTS.md](PROMPTS.md).
