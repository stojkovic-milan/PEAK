using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class v111 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserApplicationUser_AspNetUsers_PratiociId",
                table: "ApplicationUserApplicationUser");

            migrationBuilder.RenameColumn(
                name: "PratiociId",
                table: "ApplicationUserApplicationUser",
                newName: "PratiteljId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUserApplicationUser_PratiociId",
                table: "ApplicationUserApplicationUser",
                newName: "IX_ApplicationUserApplicationUser_PratiteljId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserApplicationUser_AspNetUsers_PratiteljId",
                table: "ApplicationUserApplicationUser",
                column: "PratiteljId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserApplicationUser_AspNetUsers_PratiteljId",
                table: "ApplicationUserApplicationUser");

            migrationBuilder.RenameColumn(
                name: "PratiteljId",
                table: "ApplicationUserApplicationUser",
                newName: "PratiociId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUserApplicationUser_PratiteljId",
                table: "ApplicationUserApplicationUser",
                newName: "IX_ApplicationUserApplicationUser_PratiociId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserApplicationUser_AspNetUsers_PratiociId",
                table: "ApplicationUserApplicationUser",
                column: "PratiociId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
