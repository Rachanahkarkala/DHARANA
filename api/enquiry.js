import { db } from 'hatchable';

export const access='public';
export const methods=['POST'];

const choices=new Set(['Coworking','Study Space','Private Office','Meeting Room','Training / Event','Partnership','General Enquiry']);

export default async function(req,res){
  const b=req.body||{};
  const name=typeof b.name==='string'?b.name.trim():'';
  const email=typeof b.email==='string'?b.email.trim().toLowerCase():'';
  const phone=typeof b.phone==='string'?b.phone.trim():'';
  const looking=typeof b.looking==='string'?b.looking.trim():'';
  const message=typeof b.message==='string'?b.message.trim():'';
  if(!name||name.length>100)return res.status(400).json({error:'Please enter your name.'});
  if(!email||email.length>200||!email.includes('@'))return res.status(400).json({error:'Please enter a valid email.'});
  if(!phone||phone.length>30)return res.status(400).json({error:'Please enter your phone number.'});
  if(!choices.has(looking))return res.status(400).json({error:'Please select what you are looking for.'});
  if(!message||message.length>2000)return res.status(400).json({error:'Please add a message.'});
  await db.query('CREATE TABLE IF NOT EXISTS enquiries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL, phone text NOT NULL, looking_for text NOT NULL, message text NOT NULL, created_at timestamptz NOT NULL DEFAULT now())');
  await db.query('INSERT INTO enquiries (name,email,phone,looking_for,message) VALUES ($1,$2,$3,$4,$5)',[name,email,phone,looking,message]);
  res.status(201).json({ok:true});
}