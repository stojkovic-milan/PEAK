using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class V15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Odobrena",
                table: "Planine",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Prihvacen",
                table: "AspNetUsers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Odobrena",
                table: "Planine");

            migrationBuilder.DropColumn(
                name: "Prihvacen",
                table: "AspNetUsers");
        }
    }
}
