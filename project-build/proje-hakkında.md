Proje Bana geldiğinde ilk olarak geniş detaylı bir analiz yaptım ve katman katman düşündüm. Gereksinimlerin üzerinden aşama aşama ilerlemeye başladım.

1-) Proje Yapısı

-İlk olarak projenin yapısını, modelleri,servisleri,componentlerini,urlleri, routerlerini ve particular componentleri frontend>app> klasörü içine yerleştirdim. Bunların routerlerini ayarladım ve hangi componentin hangi component içinde gösterileceğini ayarlayıp düzelttim.

2-) Tasarım ve responsive

-Css kısmında bir sorunum olmadığından öncelikle bootstrap kütüphanesini projeme ekleyip bootstrap kütüphanesinin verdiği kolaylıkla tasarımları halletmeye başladım. 
Homepage ve tablo en zor kısımdı. Başarılı bir şekilde entegreleri yaptıktan sonra tasarımları 1-2 gün içinde sizlerin de verdiği figma tasarımlarının aynısına benzetmeye başladım. En son olarak responsive için gerekli media css kodlarını yazdıktan sonra projede hiçbir türlü responsive sorunu da kalmadı. Bundan sonra da olay tamamen backend-veritabanı-typescript üzerine gerçekleşecekti.

3-) Backend-SQL

Öncelikle çok fazla node-express - mysql bilgim olmadığımdan bir kaç döküman okudum ve ingilizce olarak bir kaç ders örneği izledim. Gerekli user-socialmedia modellerini kodladıktan sonra bunları asıl servislerde kullanmak için hazırdım. Öncelikle database connection kısmını halletmeye çalıştım ve başarıyla sql e bağlantı sağladım. Bir kaç denemeden sonra yavaş yavaş ilk servislerimi oluşturdum. >backend>src>server.ts üzerinde gerekli post-get-put-delete ayarlamalarından sonra backend>database>socialMedia.service.ts dosyası altında servislerimi oluşturdum. Ardından bu servisleri front üzerinde yakalayıp kodlarımda kullanacaktım.

4-) Frontend-typescript

Yazdığım servisleri ilk olarak frontend>src>app>services>social.service.ts üzerinde yakalayıp kodlarımda kullanmaya başladım. Table componenti üzerinde verileri alıp yerleştirdim. Dahas sonra frontend>src>app>components klasöründeki modal componentlerinde gerekli create - save - delete modallarını düzenleyip form kullanarak gerekli dataları servise göndererek başarıyla tamamladım. Tabi bir kaç sorun oluşuyordu, gerek sayfa yenilemelerinde bazen yükleme esnalarında. Bunları da hallettikten sonra diğer işlemlere geçtim.

5-) AUTH GUARD

Homepage benim ana sayfamdı ve bu sayfada diğer particular dosyalarından componentlerine her şey bağlıydı. Fakat ayrı bir component oluşturup login.component.ts üzerinde bir guard tanımladım. Öncelikle frontend>src>app>services>auth-guard.ts üzerinde gerekli login-auth guardlarını tanımladım ve bunları
frontend>src>app>app.routes.ts üzerinde tanımlayıp canActivateyi etkili hale getirdim. Tabi burada bir username ve password alıyordum ve login kısmında eğer kullanıcı giriş yaparsa 'login:true' diye bir değişkeni locale kaydediyorum eğer kullanıcı da bu durum 'false' ise url'ler arası geçişi engelliyordum. Tabi daha önce sql üzerinde kurduğum users tablosu içerisine servis gönderterek userlogin ve password ile giriş resultunu true aldıktan sonra homepageye yönlendiriyordum. Bu sayede guard kısmı da bitmiş oldu. Access token ile uğraşmadım.

6-) CUSTOM DİRECTİVE-PİPE

Table componenti içerisinde linklerin isimlerini büyük gösterecek bir custom pipe ayarladım. Bu pipe frontend>src>app>shared>constants>pipes.ts üzerinde bulunuyor. Buradan da table componente import ettirterek nameyi büyük gösterdim. 
Directive kısmında ise yine aynı yol üzerinde frontend>src>app>shared>constants>directives.ts dosyası üzerinde linklerin başının http,https olarak onaylayacak aksi takdirde bunu reddecek bir sistem kurdum. Bu servisi de create-save modallarıma import edip doğruluğunu kontrol edip yayımladım.

7-) LocalStorage Kullanımı - Linklerin state durumu

Local üzerinde kullanıcın son tıkladığı linkleri listeleyecek bir sistem kurdum. Bu sistem kullanıcı linke tıkladığında locale o veriyi kaydettirip aynı şekilde ekranda 'Son Gezdiklerim' butonuna tıkladığınızda yan tarafta hangi linki kaç kere tıkladığınızı gösteren bir sistem kurdum. Burada gerekli state bilgilerini alarak bunu sağladım.
