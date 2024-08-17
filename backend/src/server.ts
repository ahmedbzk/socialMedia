import express from "express";
import cors from "cors";
import { Social } from "./socialModel";
import {DbConnection} from "../database/connection"
import {SocialMediaService} from "../database/socialMedia.service"
import {UserService} from "../database/user.service"


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

let socials: Social[] = []; // Mock veri saklama

DbConnection.connectMySql();


// Sosyal medya datalarını getirtme ve searchbar ile arama servisi
app.get("/api/socials",(req,res) =>{
    SocialMediaService.searchSocialLinks(req.query.searchTerm,res);
})


// Sosyal medya verilerini ekleme
app.post('/api/socials', (req,res) => {

    console.log('Received Data:', req.body);  // Verinin sunucuya düzgün iletilip iletilmediğini kontrol edin.

    const newSocial: Omit<Social, 'id'> = req.body; // ID olmadan gelen veriyi alıyoruz

    const newRecord: Social = {id:null, ...newSocial };

    SocialMediaService.saveSocialLink(newRecord,res);
  
});

// Sosyal medya verisini güncelleme
app.put('/api/socials/:id', (req,res) => {

    const id = parseInt(req.params.id);

    const socialData: Omit<Social, 'id'> = req.body; // ID olmadan gelen veriyi alıyoruz

    const updatedRecord: Social = {id:id, ...socialData };

    SocialMediaService.saveSocialLink(updatedRecord,res);
});

// Sosyal medya verisini silme
app.delete('/api/socials/:id', (req,res) => {
    const id = parseInt(req.params.id);
    SocialMediaService.deleteSocialLink(id,res);
});

// Kullanıcı giriş apisi
app.post('/api/users/login',(req,res) => {

    UserService.login(req.body,res);
})


const port=5000;
app.listen(port,()=>{
    console.log("website server on http://localhost:"+port);
})