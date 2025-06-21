"use client"
const SidebarItem = ({ icon, title, subtitle }) => (
    <div className="flex flex-col cursor-pointer hover:bg-gray-300 rounded-lg p-2 transition">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      {subtitle && <span className="ml-7 text-sm text-gray-500">{subtitle}</span>}
    </div>
  );
  

  export default SidebarItem;