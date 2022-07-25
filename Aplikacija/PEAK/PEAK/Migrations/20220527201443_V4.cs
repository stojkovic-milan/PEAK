using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PEAK.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PriajveDogadjaja_AspNetUsers_KorisnikId",
                table: "PriajveDogadjaja");

            migrationBuilder.DropForeignKey(
                name: "FK_PriajveDogadjaja_Dogadjaji_DogadjajID",
                table: "PriajveDogadjaja");

            migrationBuilder.DropForeignKey(
                name: "FK_Prognoze_Dogadjaji_Id",
                table: "Prognoze");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prognoze",
                table: "Prognoze");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PriajveDogadjaja",
                table: "PriajveDogadjaja");

            migrationBuilder.RenameTable(
                name: "Prognoze",
                newName: "Prognoza");

            migrationBuilder.RenameTable(
                name: "PriajveDogadjaja",
                newName: "PrijaveDogadjaja");

            migrationBuilder.RenameIndex(
                name: "IX_PriajveDogadjaja_KorisnikId",
                table: "PrijaveDogadjaja",
                newName: "IX_PrijaveDogadjaja_KorisnikId");

            migrationBuilder.RenameIndex(
                name: "IX_PriajveDogadjaja_DogadjajID",
                table: "PrijaveDogadjaja",
                newName: "IX_PrijaveDogadjaja_DogadjajID");

            migrationBuilder.AddColumn<string>(
                name: "SlikaPlanine",
                table: "Planine",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SlikaDrustva",
                table: "PlaninarskaDrustva",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Udaljenost",
                table: "Interesovanja",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SlikaDogadjaja",
                table: "Dogadjaji",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProfilnaSlika",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "LokacijaID",
                table: "PrijaveDogadjaja",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UtisakID",
                table: "PrijaveDogadjaja",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prognoza",
                table: "Prognoza",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PrijaveDogadjaja",
                table: "PrijaveDogadjaja",
                column: "ID");

            migrationBuilder.CreateTable(
                name: "PrijaveLokacije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Razlog = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    KorisnikId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LokacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrijaveLokacije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrijaveLokacije_AspNetUsers_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrijaveLokacije_Lokacije_LokacijaID",
                        column: x => x.LokacijaID,
                        principalTable: "Lokacije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrijaveUtisaka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Razlog = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    KorisnikId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UtisakID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrijaveUtisaka", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrijaveUtisaka_AspNetUsers_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrijaveUtisaka_Utisci_UtisakID",
                        column: x => x.UtisakID,
                        principalTable: "Utisci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PrijaveDogadjaja_LokacijaID",
                table: "PrijaveDogadjaja",
                column: "LokacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_PrijaveDogadjaja_UtisakID",
                table: "PrijaveDogadjaja",
                column: "UtisakID");

            migrationBuilder.CreateIndex(
                name: "IX_PrijaveLokacije_KorisnikId",
                table: "PrijaveLokacije",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_PrijaveLokacije_LokacijaID",
                table: "PrijaveLokacije",
                column: "LokacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_PrijaveUtisaka_KorisnikId",
                table: "PrijaveUtisaka",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_PrijaveUtisaka_UtisakID",
                table: "PrijaveUtisaka",
                column: "UtisakID");

            migrationBuilder.AddForeignKey(
                name: "FK_PrijaveDogadjaja_AspNetUsers_KorisnikId",
                table: "PrijaveDogadjaja",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PrijaveDogadjaja_Dogadjaji_DogadjajID",
                table: "PrijaveDogadjaja",
                column: "DogadjajID",
                principalTable: "Dogadjaji",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PrijaveDogadjaja_Lokacije_LokacijaID",
                table: "PrijaveDogadjaja",
                column: "LokacijaID",
                principalTable: "Lokacije",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PrijaveDogadjaja_Utisci_UtisakID",
                table: "PrijaveDogadjaja",
                column: "UtisakID",
                principalTable: "Utisci",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Prognoza_Dogadjaji_Id",
                table: "Prognoza",
                column: "Id",
                principalTable: "Dogadjaji",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrijaveDogadjaja_AspNetUsers_KorisnikId",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropForeignKey(
                name: "FK_PrijaveDogadjaja_Dogadjaji_DogadjajID",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropForeignKey(
                name: "FK_PrijaveDogadjaja_Lokacije_LokacijaID",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropForeignKey(
                name: "FK_PrijaveDogadjaja_Utisci_UtisakID",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropForeignKey(
                name: "FK_Prognoza_Dogadjaji_Id",
                table: "Prognoza");

            migrationBuilder.DropTable(
                name: "PrijaveLokacije");

            migrationBuilder.DropTable(
                name: "PrijaveUtisaka");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prognoza",
                table: "Prognoza");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PrijaveDogadjaja",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropIndex(
                name: "IX_PrijaveDogadjaja_LokacijaID",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropIndex(
                name: "IX_PrijaveDogadjaja_UtisakID",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropColumn(
                name: "SlikaPlanine",
                table: "Planine");

            migrationBuilder.DropColumn(
                name: "SlikaDrustva",
                table: "PlaninarskaDrustva");

            migrationBuilder.DropColumn(
                name: "Udaljenost",
                table: "Interesovanja");

            migrationBuilder.DropColumn(
                name: "SlikaDogadjaja",
                table: "Dogadjaji");

            migrationBuilder.DropColumn(
                name: "ProfilnaSlika",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LokacijaID",
                table: "PrijaveDogadjaja");

            migrationBuilder.DropColumn(
                name: "UtisakID",
                table: "PrijaveDogadjaja");

            migrationBuilder.RenameTable(
                name: "Prognoza",
                newName: "Prognoze");

            migrationBuilder.RenameTable(
                name: "PrijaveDogadjaja",
                newName: "PriajveDogadjaja");

            migrationBuilder.RenameIndex(
                name: "IX_PrijaveDogadjaja_KorisnikId",
                table: "PriajveDogadjaja",
                newName: "IX_PriajveDogadjaja_KorisnikId");

            migrationBuilder.RenameIndex(
                name: "IX_PrijaveDogadjaja_DogadjajID",
                table: "PriajveDogadjaja",
                newName: "IX_PriajveDogadjaja_DogadjajID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prognoze",
                table: "Prognoze",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PriajveDogadjaja",
                table: "PriajveDogadjaja",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PriajveDogadjaja_AspNetUsers_KorisnikId",
                table: "PriajveDogadjaja",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PriajveDogadjaja_Dogadjaji_DogadjajID",
                table: "PriajveDogadjaja",
                column: "DogadjajID",
                principalTable: "Dogadjaji",
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
    }
}
