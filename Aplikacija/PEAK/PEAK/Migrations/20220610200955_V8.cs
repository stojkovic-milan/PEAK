using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class V8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Utisci_AspNetUsers_KorinsikId",
                table: "Utisci");

            migrationBuilder.RenameColumn(
                name: "KorinsikId",
                table: "Utisci",
                newName: "KorisnikId");

            migrationBuilder.RenameIndex(
                name: "IX_Utisci_KorinsikId",
                table: "Utisci",
                newName: "IX_Utisci_KorisnikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Utisci_AspNetUsers_KorisnikId",
                table: "Utisci",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Utisci_AspNetUsers_KorisnikId",
                table: "Utisci");

            migrationBuilder.RenameColumn(
                name: "KorisnikId",
                table: "Utisci",
                newName: "KorinsikId");

            migrationBuilder.RenameIndex(
                name: "IX_Utisci_KorisnikId",
                table: "Utisci",
                newName: "IX_Utisci_KorinsikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Utisci_AspNetUsers_KorinsikId",
                table: "Utisci",
                column: "KorinsikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
