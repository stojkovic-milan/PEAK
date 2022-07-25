using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class V7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DatumObjave",
                table: "Utisci",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "KorinsikId",
                table: "Utisci",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Utisci_KorinsikId",
                table: "Utisci",
                column: "KorinsikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Utisci_AspNetUsers_KorinsikId",
                table: "Utisci",
                column: "KorinsikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Utisci_AspNetUsers_KorinsikId",
                table: "Utisci");

            migrationBuilder.DropIndex(
                name: "IX_Utisci_KorinsikId",
                table: "Utisci");

            migrationBuilder.DropColumn(
                name: "DatumObjave",
                table: "Utisci");

            migrationBuilder.DropColumn(
                name: "KorinsikId",
                table: "Utisci");
        }
    }
}
