import { DiscordServer } from "@/models/DiscordServer";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CreateServerForm from "./CreateServerForm";

export default function ServerList(): JSX.Element {
  const [activeServer,setActiveServer]=useState<DiscordServer|undefined>();
  const servers: DiscordServer[] = [
    {
      id: '1',
      name: "Test Server 1",
      image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: '2',
      name: "Test Server 2",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '3',
      name: "Test Server 3",
      image: "https://images.unsplash.com/photo-1622964318124-d87cb88d24e2?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-dark-gray h-full flex flex-col items-center ">
      {servers.map((server) => (
        <button
          key={server.id}
          onClick={() => setActiveServer(server)}
          className={`p-4 sidebar-icon ${server.id===activeServer?.id ? 'selected-icon':''}`}
        >
          {server.image && checkIfUrl(server.image) ? (
            <Image
              src={server.image}
              width={50}
              height={50}
              alt="Server Icon"
              className="rounded-icon"
            />
          ) : (
            <span className="bg-gray-600 w-[50px] h-[50px] flex items-center justify-center text-sm text-white rounded-icon">
              {server.name.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      ))}
      <Link href={'/?createServer=true'} className="flex items-center justify-center rounded-icon bg-white p-2 my-2 text-2xl font-light h-12 w-12 text-blue-400 hover:bg-blue-400 hover:text-white hover-rounded-xl transition-all duration-200">
      <span className="inline-block">+</span>
      </Link>
      <CreateServerForm/>
    </div>
  );
} 

function checkIfUrl(path: string): boolean {
    try {
      new URL(path);  // Check if the path is a valid URL without assigning to '_'
      return true;
    } catch {
      return false;
    }
  }
  
