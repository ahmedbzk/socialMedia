import { DbConnection } from "./connection";
import { Social } from "../src/socialModel";

export class SocialMediaService{
    public static searchSocialLinks(searchTerm:any,response:any){

        let bind:any = [];
        let query = 'SELECT * FROM social_links';

        if(searchTerm){
            query += ' WHERE name like ?'
            bind.push('%'+searchTerm+'%')
        }


        DbConnection.db.query(query, bind, (err, results) => {
            if (err) {
                console.error('Sorgu çalıştırılırken hata oluştu:', err);
                response.status(500).send('Veritabanı hatası');
                return;
            }
            response.send(results)
        });
    }

    public static saveSocialLink(socialLinkData:Social,response:any){

        let bind:any = [];
        let query = '';

        if(socialLinkData.id){
            query = ' UPDATE social_links set name=?,link=?,description=? WHERE id=?'
            bind = [
                socialLinkData.name,
                socialLinkData.link,
                socialLinkData.description,
                socialLinkData.id
            ];
        }else{
            query = ' INSERT INTO social_links set name=?,link=?,description=?'
            bind = [
                socialLinkData.name,
                socialLinkData.link,
                socialLinkData.description
            ];
        }

        DbConnection.db.execute(query, bind, (err, results) => {
            if (err) {
                console.error('Sorgu çalıştırılırken hata oluştu:', err);
                response.status(500).send('Veritabanı hatası');
                return;
            }
            response.send({result: true})
        });
    }

    public static deleteSocialLink(id:number,response:any){

        let bind:any = [];
        let query = '';

            query = ' DELETE FROM social_links WHERE id=?'
            bind = [
                id
            ];

        DbConnection.db.execute(query, bind, (err, results) => {
            if (err) {
                console.error('Sorgu çalıştırılırken hata oluştu:', err);
                response.status(500).send('Veritabanı hatası');
                return;
            }
            response.send({result: true})
        });
    }


}