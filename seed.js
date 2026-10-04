import 'dotenv/config'; import bcrypt from 'bcryptjs'; import {PrismaClient} from '@prisma/client';
const p=new PrismaClient();
const cats=["Men’s Chappals","Women’s Chappals","Men’s Slippers","Women’s Slippers","Sandals","Casual Footwear","Formal Footwear","New Arrivals"];
const imgs=["https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"];
for(const name of cats) await p.category.upsert({where:{name},update:{},create:{name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}});
const cat=await p.category.findFirst({where:{name:"Men’s Chappals"}});
await p.product.upsert({where:{sku:"MF-MC-001"},update:{},create:{name:"Mehta Comfort Classic Chappal",slug:"mehta-comfort-classic-chappal",description:"Everyday comfort footwear with a soft footbed and durable sole.",price:699,compareAtPrice:999,brand:"Mehta Footwear",sku:"MF-MC-001",categoryId:cat.id,images:{create:imgs.map((url,i)=>({url,sort:i}))},variants:{create:["6","7","8","9","10"].map(size=>({size,stock:20}))}}});
const hash=await bcrypt.hash(process.env.ADMIN_PASSWORD||'ChangeMe123!',12); await p.user.upsert({where:{email:process.env.ADMIN_EMAIL||'admin@mehtafootwear.in'},update:{passwordHash:hash,role:'ADMIN'},create:{email:process.env.ADMIN_EMAIL||'admin@mehtafootwear.in',name:'Mehta Footwear Admin',passwordHash:hash,role:'ADMIN'}});
console.log('Seed complete'); await p.$disconnect();
