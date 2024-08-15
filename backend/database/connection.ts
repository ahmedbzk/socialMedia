import mysql from 'mysql2';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';


export class DbConnection{
    public static db:Connection;

    public static connectMySql(){

        // MySQL bağlantısını oluşturma
        this.db = mysql.createConnection({
            host: 'localhost',   // Veritabanı sunucusunun adresi
            user: 'root',        // Veritabanı kullanıcı adı
            password: '',        // Veritabanı şifresi
            database: 'social_media' // Kullanmak istediğiniz veritabanı adı
        });

        // Veritabanı bağlantısını sağlama
        this.db.connect((err:any) => {
            if (err) {
                console.error('Veritabanına bağlanırken hata oluştu:', err);
                return;
            }
            console.log('MySQL veritabanına başarıyla bağlandı!');
        });
    }
    
}



