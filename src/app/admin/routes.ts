import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { ManageOrderComponent } from "./manage-order/manage-order.component";
import { ManageProductComponent } from "./manage-product/manage-product.component";
import { ManageQuantityComponent } from "./manage-quantity/manage-quantity.component";

export const adminRoutes : Routes = [
    {path: '', component: AdminPanelComponent, 
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'order', component: ManageOrderComponent },
            { path: 'product', component: ManageProductComponent },
            { path: 'quantity', component: ManageQuantityComponent },
        ]
    },
];