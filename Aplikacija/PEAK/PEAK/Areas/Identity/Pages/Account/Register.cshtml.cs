using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using PEAK.Models;

namespace PEAK.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RegisterModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterModel> logger,
            RoleManager<IdentityRole> roleManager,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Ime")]
            public string Ime { get; set; }
            
            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Prezime")]
            public string Prezime { get; set; }

            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Adresa")]
            public string Adresa { get; set; }

            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Spremnost")]
            public string Spremnost{ get; set; }
            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }
            [Required]
            [Phone]
            [Display(Name = "Phone Number")]
            public string PhoneNumber { get; set; }
            [Required]
            [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
            public string ConfirmPassword { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (User.Identity.IsAuthenticated)
            {
                Response.Redirect("/");
            }

            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                String defaultProfilna = @"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
                var user = new ApplicationUser { UserName = Input.Email, Email = Input.Email, Ime = Input.Ime,Prezime=Input.Prezime,Adresa=Input.Adresa,Spremnost=int.Parse(Input.Spremnost),PhoneNumber=Input.PhoneNumber,ProfilnaSlika=defaultProfilna,Prihvacen=false};
                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    var defaultrole = _roleManager.FindByNameAsync("Korisnik").Result;
                    if (defaultrole != null)
                    {
                        IdentityResult roleresult = await _userManager.AddToRoleAsync(user, defaultrole.Name);
                    }
                    _logger.LogInformation("User created a new account with password.");

                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    //var callbackUrl = Url.Page(
                    //    "/Account/ConfirmEmail",
                    //    pageHandler: null,
                    //    values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                    //    protocol: Request.Scheme);

                    //await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                    //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
                    //
                    //var confirmationLink = Url.Action("VerifikacijaKlijenta", "ApplicationUser", new { code, email = user.Email }, Request.Scheme);

                    //VERZIJA3
                    var tokenGenerated = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(tokenGenerated);
                    var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                    var confirmationLink = Url.Action("VerifikacijaKlijenta", "ApplicationUser", new { codeEncoded, email = user.Email }, Request.Scheme);

                    //
                    String poruka;
                        poruka = $"Postovani {Input.Ime}\n\nKreiran je nalog na sajtu PEAK, molimo vas potvrdite identitet klikom na link ispod.\n" +
                           /* HtmlEncoder.Default.Encode(callbackUrl)*/ confirmationLink + "\n\nDobrodosli na PEAK!";
                    SmtpClient Client = new SmtpClient()
                    {
                        Host = "smtp.outlook.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential()
                        {
                            UserName = "peaksw@outlook.com",
                            Password = "Kjkszpj1@"
                        }
                    };
                    MailAddress fromMail = new MailAddress("peaksw@outlook.com", "PEAK");
                    MailAddress toMail = new MailAddress(Input.Email, Input.Ime);
                    MailMessage message = new MailMessage()
                    {
                        From = fromMail,
                        Subject = "Potvrdite Vas nalog na sajtu PEAK",
                        Body = poruka
                    };

                    message.To.Add(toMail);
                    await Client.SendMailAsync(message);
                    //
                    //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    //{

                    //TEST
                        //return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                        return Redirect("https://localhost:5001/");
                    //}
                    //else
                    //{
                    //    await _signInManager.SignInAsync(user, isPersistent: false);
                    //    return LocalRedirect(returnUrl);
                    //}
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
