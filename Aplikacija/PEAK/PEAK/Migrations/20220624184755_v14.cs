using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class v14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Kreirano",
                table: "PlaninarskaDrustva",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "NalogDrustvaId",
                table: "PlaninarskaDrustva",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PlaninarskaDrustva_NalogDrustvaId",
                table: "PlaninarskaDrustva",
                column: "NalogDrustvaId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaninarskaDrustva_AspNetUsers_NalogDrustvaId",
                table: "PlaninarskaDrustva",
                column: "NalogDrustvaId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaninarskaDrustva_AspNetUsers_NalogDrustvaId",
                table: "PlaninarskaDrustva");

            migrationBuilder.DropIndex(
                name: "IX_PlaninarskaDrustva_NalogDrustvaId",
                table: "PlaninarskaDrustva");

            migrationBuilder.DropColumn(
                name: "Kreirano",
                table: "PlaninarskaDrustva");

            migrationBuilder.DropColumn(
                name: "NalogDrustvaId",
                table: "PlaninarskaDrustva");
        }
    }
}
