import { DbConnection } from "./connection";

export class UserService{
   

    public static login(model:any,response:any){

        let bind:any = [];
        let query = 'SELECT * FROM users WHERE username=? AND password=?';

            bind = [
                model.username,
                model.password
            ];

        DbConnection.db.execute(query, bind, (err, results:any) => {
            if (err) {
                console.error('Sorgu çalıştırılırken hata oluştu:', err);
                response.status(500).send('Veritabanı hatası');
                return;
            }
            if (results.length > 0) {
                // Eğer kullanıcı bulunduysa
                response.send({ result: true, data: results[0] });
              } else {
                // Eğer kullanıcı bulunamadıysa
                response.status(401).send('Kullanıcı adı veya şifre hatalı');
              }

        });
    }
    

}