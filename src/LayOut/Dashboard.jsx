// src/layouts/DashboardLayout.jsx
import { Outlet, useLocation, Link } from 'react-router-dom';
import { SidebarProvider,  Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../components/ui/sidebar";
import { PanelLeft, Box, Truck, Package, Users, Star, User, Home } from 'lucide-react';
import useAdmin from '@/Hooks/useAdmin';
import Navbar from '@/Components/Shared/Navbar';
import Sales from '@/Components/Shared/Sales';
import Chart from '@/Components/Shared/Chart';

const Dashboard = () => {
  const location = useLocation();
  
  // Temporary role variable - replace with your auth context
   // Can be 'admin', 'user', or 'delivery'
const [role] =useAdmin()
// console.log(role);
  return (
    
    <SidebarProvider>
     
      <div className="flex  min-h-screen">
      
        {/* Desktop Sidebar */}
        <Sidebar variant="sidebar" className="border-r">
          <SidebarContent>
            <SidebarMenu>
              {/* Dashboard Home */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard'}
                >
                  <Link to="/dashboard">
                    <PanelLeft className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* User-specific Menu Items */}
              {role === 'user' && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/book-parcel'}
                    >
                      <Link to="/dashboard/book-parcel">
                        <Box className="h-4 w-4" />
                        <span>Book Parcel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/my-parcels'}
                    >
                      <Link to="/dashboard/my-parcels">
                        <Package className="h-4 w-4" />
                        <span>My Parcels</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard/profile'}
                >
                  <Link to="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                </>
              )}

              {/* Delivery-specific Menu Items */}
              {role === 'deliveryman' && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/deliveries'}
                    >
                      <Link to="/dashboard/deliveries">
                        <Truck className="h-4 w-4" />
                        <span>My Deliveries</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/reviews'}
                    >
                      <Link to="/dashboard/reviews">
                        <Star className="h-4 w-4" />
                        <span>My Reviews</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Admin-specific Menu Items */}
              {role === 'admin' && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/all-parcels'}
                    >
                      <Link to="/dashboard/all-parcels">
                        <Package className="h-4 w-4" />
                        <span>All Parcels</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/all-users'}
                    >
                      <Link to="/dashboard/all-users">
                        <Users className="h-4 w-4" />
                        <span>All Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/dashboard/all-deliveryman'}
                    >
                      <Link to="/dashboard/all-deliveryman">
                        <Truck className="h-4 w-4" />
                        <span>All Deliveryman</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
               
              </SidebarMenuItem>
                </>
              )}
               <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/"}
                >
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>

              
              
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1  p-8">
          {/* Mobile Sidebar Trigger */}
          <div className="md:hidden mb-4">
            <SidebarTrigger />
          </div>
         <div className='flex justify-center'>
         {role === 'admin' && <Sales />}
         </div>
         <div className=''>
         {role === 'admin' && <Chart />}
         </div>

          {/* Nested Route Content */}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;