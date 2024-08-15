import express from "express";
import cors from "cors";
import { Social } from "./socialModel";
import {DbConnection} from "../database/connection"
import {SocialMediaService} from "../database/socialMedia.service"


const app = express();
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

    const newSocial: Omit<Social, 'id'> = req.body; // ID olmadan gelen veriyi alıyoruz

    const newRecord: Social = {id:null, ...newSocial };

    SocialMediaService.saveSocialLink(newRecord,res);
  
});

// Sosyal medya verisini güncelleme
app.put('/api/socials/:id', (req,res) => {

    const id = parseInt(req.params.id);
    const updatedSocial: Social = req.body;

    const socialData: Omit<Social, 'id'> = req.body; // ID olmadan gelen veriyi alıyoruz

    const updatedRecord: Social = {id:id, ...socialData };

    SocialMediaService.saveSocialLink(updatedRecord,res);
});

// Sosyal medya verisini silme
app.delete('/api/socials/:id', (req,res) => {
    const id = parseInt(req.params.id);
    SocialMediaService.deleteSocialLink(id,res);
});



const port=5000;
app.listen(port,()=>{
    console.log("website server on http://localhost:"+port);
})