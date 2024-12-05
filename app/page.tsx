import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Image from 'next/image'

export default function Home() {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Menubar */}
        <Menubar className="px-4 border-b">
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-500">Interview</h1>
            </div>

            {/* Test Duration */}
            <div className="text-sm font-medium">
              Total Duration: 60:00
            </div>
          </div>
        </Menubar>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-bold text-blue-500">AI Interview Test</h1>
          <p className="mt-4 text-lg text-gray-700">Get started with your test by following the instructions.</p>
          <a
            href="/instructions"
            className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Test
          </a>
        </div>
      </div>
    );
  }
