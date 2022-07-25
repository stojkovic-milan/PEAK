import React from 'react'
import AdministratorStranica from './NaseKomponente/AdministratorStranica'
import AdministratorCardDogadjaj from './NaseKomponente/AdministratorCardDogadjaj'
import authService from './api-authorization/AuthorizeService' /*'../api-authorization/AuthorizeService'*/

export default function StranicaAdministrator() {
    const [admin, setAdmin] = React.useState(false);
    React.useEffect(() => {
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/ProveraAdministratora", {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            console.log(res.text);
            if (!res.redirected)
                setAdmin(true)
            else
                window.location.href = 'https://localhost:5001/Identity/Account/AccessDenied?ReturnUrl=%2FApplicationUser%2FProveraAdministratora';
        }
        getDg();
    }, []);

  return (
    <div>
          {admin&&<AdministratorStranica />}
    </div>
  )
}
