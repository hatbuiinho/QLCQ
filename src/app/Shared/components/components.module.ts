import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { MenuModule } from 'primeng/menu';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InplaceModule } from 'primeng/inplace';

import { DirectivesModule } from '../Directives/directives.module';
import { PipesModule } from '../Pipes/pipes.module';
import { AreaComponent } from './area/area.component';
import { AssigmentToolbarComponent } from './assigment-toolbar/assigment-toolbar.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { CroppableImageInputComponent } from './croppable-image-input/croppable-image-input.component';
import { DepartmentAssignDialogComponent } from './department-assign-dialog/department-assign-dialog.component';
import { DepartmentDetailDialogComponent } from './department-detail-dialog/department-detail-dialog.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { EventDropdownComponent } from './event-dropdown/event-dropdown.component';
import { EventRegisterListComponent } from './event-register-list/event-register-list.component';
import { EventRegisterComponent } from './event-register/event-register.component';
import { ExcelErrorTableComponent } from './excel-error-table/excel-error-table.component';
import { FooterComponent } from './footer/footer.component';
import { GroupComponent } from './group/group.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PermissionAssignComponent } from './permission-assign/permission-assign.component';
import { ReceiveCardAddressComponent } from './receive-card-address/receive-card-address.component';
import { RegisterTableComponent } from './register-table/register-table.component';
import { RegistryPageComponent } from './registry-page/registry-page.component';
import { RoleListComponent } from './role-list/role-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import { StartAddressComponent } from './start-address/start-address.component';
import { StartTimeTableComponent } from './start-time-table/start-time-table.component';
import { RegisterCommentListComponent } from './register-comment-list/register-comment-list.component';
import { RegisterCommentComponent } from './register-comment/register-comment.component';
import { PrintCardComponent } from './print-card/print-card.component';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    PageNotFoundComponent,
    DepartmentDetailDialogComponent,
    DepartmentDetailComponent,
    MemberListComponent,
    EventRegisterListComponent,
    MemberComponent,
    EventRegisterComponent,
    SkillDialogComponent,
    AreaComponent,
    RegistryPageComponent,
    EventDropdownComponent,
    StartTimeTableComponent,
    StartAddressComponent,
    DepartmentAssignDialogComponent,
    RegisterTableComponent,
    ComingSoonComponent,
    ExcelErrorTableComponent,
    GroupComponent,
    AssigmentToolbarComponent,
    CroppableImageInputComponent,
    RoleListComponent,
    PermissionAssignComponent,
    ReceiveCardAddressComponent,
    RegisterCommentListComponent,
    RegisterCommentComponent,
    PrintCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    RippleModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    SelectButtonModule,
    EditorModule,
    RadioButtonModule,
    ScrollPanelModule,
    FileUploadModule,
    CardModule,
    PipesModule,
    ChipsModule,
    CalendarModule,
    BadgeModule,
    TagModule,
    FieldsetModule,
    InputTextareaModule,
    ImageModule,
    ToggleButtonModule,
    ImageCropperModule,
    DirectivesModule,
    TreeModule,
    TabViewModule,
    MultiSelectModule,
    SkeletonModule,
    TriStateCheckboxModule,
    ClipboardModule,
    CarouselModule,
    MenuModule,
    OverlayPanelModule,
    QrCodeModule,
    InplaceModule,
    MultiSelectModule,
  ],
  exports: [
    LayoutComponent,
    DepartmentDetailDialogComponent,
    DepartmentDetailComponent,
    MemberComponent,
    MemberListComponent,
    EventRegisterComponent,
    AreaComponent,
    RegistryPageComponent,
    EventDropdownComponent,
    StartTimeTableComponent,
    StartAddressComponent,
    DepartmentAssignDialogComponent,
    RegisterTableComponent,
    ExcelErrorTableComponent,
    GroupComponent,
    AssigmentToolbarComponent,
    CroppableImageInputComponent,
    RoleListComponent,
    PermissionAssignComponent,
    ReceiveCardAddressComponent,
    RegisterCommentComponent,
    RegisterCommentListComponent,
    PrintCardComponent,
    MultiSelectModule,
    InplaceModule,
  ],
})
export class ComponentsModule {}
