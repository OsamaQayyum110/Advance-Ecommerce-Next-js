"use server";
import db from "@/db/db";
import { notFound } from "next/navigation";

export async function DeleteUser(id:string){
const users = await db.user.delete({where:{id}});
if (users == null) return notFound();
return users 
}