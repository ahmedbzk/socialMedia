NOT: Projede; 

frontend localim: 4200 portu (servis isteklerini 5000 portuna yolluyoruz. local urllerini değiştirmek için "frontend>src>app>shared>constants>urls.ts")
backend localim: 5000 portu (değiştirmek için "backend>src>server.ts")

1-) Veritabanı (SQL)

Anasayfada direkt bulunan "postman-database" klasöründeki .sql uzantılı dosyayı veritabanınıza ekleyiniz. 
Postman dosyasını da postmaninize import ederek gerekli servis ve parametrelere ulaşabilirsiniz.


2-) Backend =>

Backend kısmı için önce terminali açınız. 'cd backend' klasörü içine girip 
1-npm install
2-npm start
ile backendinizi çalıştırabilirsiniz.


3-) Frontend =>

Öncelikle terminale girip 'cd frontend' klasörünü açınız ve burada
1-npm install (eğer işe yaramazsa "npm install --force")
2-ng serve
yaparak frontendi de build etmiş olursunuz. Force kullanmamın sebebi bazı ngx operatör sürümleriyle angular sürümü uyumlu olmadığından hata alıyorsunuz. Projede bir sorunla karşılaşmadım.


Bu dediğim aşamaları kendimde yaptım ve çalıştırdım. Bir sorun olursa sorabilirsiniz. Keyifli incelemeler...