using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class V14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogadjaji_PlaninarskaDrustva_PlaninarskoDrustvoID",
                table: "Dogadjaji");

            migrationBuilder.RenameColumn(
                name: "PlaninarskoDrustvoID",
                table: "Dogadjaji",
                newName: "OrganizatorID");

            migrationBuilder.RenameIndex(
                name: "IX_Dogadjaji_PlaninarskoDrustvoID",
                table: "Dogadjaji",
                newName: "IX_Dogadjaji_OrganizatorID");

            migrationBuilder.CreateTable(
                name: "PriajveDogadjaja",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Razlog = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    KorisnikId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DogadjajID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriajveDogadjaja", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PriajveDogadjaja_AspNetUsers_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PriajveDogadjaja_Dogadjaji_DogadjajID",
                        column: x => x.DogadjajID,
                        principalTable: "Dogadjaji",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PriajveDogadjaja_DogadjajID",
                table: "PriajveDogadjaja",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_PriajveDogadjaja_KorisnikId",
                table: "PriajveDogadjaja",
                column: "KorisnikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dogadjaji_PlaninarskaDrustva_OrganizatorID",
                table: "Dogadjaji",
                column: "OrganizatorID",
                principalTable: "PlaninarskaDrustva",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogadjaji_PlaninarskaDrustva_OrganizatorID",
                table: "Dogadjaji");

            migrationBuilder.DropTable(
                name: "PriajveDogadjaja");

            migrationBuilder.RenameColumn(
                name: "OrganizatorID",
                table: "Dogadjaji",
                newName: "PlaninarskoDrustvoID");

            migrationBuilder.RenameIndex(
                name: "IX_Dogadjaji_OrganizatorID",
                table: "Dogadjaji",
                newName: "IX_Dogadjaji_PlaninarskoDrustvoID");

            migrationBuilder.AddForeignKey(
                name: "FK_Dogadjaji_PlaninarskaDrustva_PlaninarskoDrustvoID",
                table: "Dogadjaji",
                column: "PlaninarskoDrustvoID",
                principalTable: "PlaninarskaDrustva",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
