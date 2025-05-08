import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CloseIcon, useChatContext } from "stream-chat-react"
import { useRef, useEffect, useState, useCallback } from "react";
import { UserObject } from "@/models/UserObject";
import UserRow from "../UserRow";
type FormState={
    serverName:string;
    serverImage: string;
    users: UserObject[];

}
export default function CreateServerForm():JSX.Element{
    const params =useSearchParams();
    const showCreateServerForm =params.get('createServer');
    const dialogRef =useRef<HTMLDialogElement>(null);
    const {client}=useChatContext();
    const initialState:FormState={
        serverName:'',
        serverImage:'',
        users:[]
    }; 
    const [formData,setFormData]=useState<FormState>(initialState);
    const [users,setUsers]=useState<UserObject[]>([]);
    const loadUsers=useCallback(async ()=>{
        const response =await client.queryUsers({})
        const users:UserObject[]=response.users
        .filter((user)=>user.role!=='admin')
        .map((user)=>{
            return {
                id: user.id,
                name:user.name?? user.id,
                image:user.image as string,
                online:user.online, 
                lastOnline:user.last_active,
            };
        });
        if (users) setUsers(users);
    },[client])
    useEffect(()=>{
       if (showCreateServerForm &&  dialogRef.current){
        dialogRef.current.showModal();
       } else{
        dialogRef.current?.close();
       }
    },[showCreateServerForm]);
    useEffect(()=>{
            loadUsers();
    },[loadUsers]);
    return (
        <dialog className="absolute z-10 space-y-2 rounded-xl" ref={dialogRef} >
            <div className="w-full flex items-center justify-between py-8 px-6">
                <h2 className="text-3xl font-semibold text-gray-600">
                    créer un neauveau serveur 

                </h2>
                <Link href='/'>
                <CloseIcon/>
                </Link>

            </div> 
            <form method="dialog" className="flex flex-col space-y-2 px-6">
                <label className="labelTitle" htmlFor="serverName">
                  nom du serveur 
                </label>
                <div className="flex items-center bg-gray-100 rounded">
                   <span className="text-2xl p-2 text-gray-500">#</span>
                   <input type='text'
                   id='serverName'
                   value={formData.serverName}
                   onChange={(e)=>setFormData({...formData,serverName: e.target.value})}
                   required
                   />
                </div>
                <label className="labelTitle" htmlFor="serverImage">
                    Image URL
                </label>
                <div className="flex items-center bg-gray-100 rounded">
                <span className="text-2xl p-2 text-gray-500">#</span>
                   <input type='text'
                   id='serverName'
                   value={formData.serverName}
                   onChange={(e)=>setFormData({...formData,serverName: e.target.value})}
                   required
                   />
                </div>
                <div className="max-h-64 overflow-y-scroll">
                    {users.map((user)=>(
                       <UserRow key={user.id} user={user} userChanged={userChange} />
                    ))}

                </div>
            </form>
        </dialog>
    ) 
    function userChange(user:UserObject, checked:boolean ){
    if (checked){
        setFormData({
            ...formData,
            users:[...formData.users, user ],
        }
        )
    } else{
        setFormData({
            ...formData,
        users: formData.users.filter((thisUser)=>thisUser.id!==user.id),
    })

    }
}
}
