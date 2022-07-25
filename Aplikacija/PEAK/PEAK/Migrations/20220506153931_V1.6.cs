using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class V16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogadjaji_Ruta_rutaID",
                table: "Dogadjaji");

            migrationBuilder.RenameColumn(
                name: "rutaID",
                table: "Dogadjaji",
                newName: "RutaID");

            migrationBuilder.RenameIndex(
                name: "IX_Dogadjaji_rutaID",
                table: "Dogadjaji",
                newName: "IX_Dogadjaji_RutaID");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Prognoze",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Dogadjaji_Ruta_RutaID",
                table: "Dogadjaji",
                column: "RutaID",
                principalTable: "Ruta",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Prognoze_Dogadjaji_Id",
                table: "Prognoze",
                column: "Id",
                principalTable: "Dogadjaji",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogadjaji_Ruta_RutaID",
                table: "Dogadjaji");

            migrationBuilder.DropForeignKey(
                name: "FK_Prognoze_Dogadjaji_Id",
                table: "Prognoze");

            migrationBuilder.RenameColumn(
                name: "RutaID",
                table: "Dogadjaji",
                newName: "rutaID");

            migrationBuilder.RenameIndex(
                name: "IX_Dogadjaji_RutaID",
                table: "Dogadjaji",
                newName: "IX_Dogadjaji_rutaID");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Prognoze",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Dogadjaji_Ruta_rutaID",
                table: "Dogadjaji",
                column: "rutaID",
                principalTable: "Ruta",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
