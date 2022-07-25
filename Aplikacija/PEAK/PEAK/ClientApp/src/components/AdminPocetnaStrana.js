import React from 'react';
import AdministratorPocetnaStranica from './NaseKomponente/AdministratorPocetnaStranica';
import authService from './api-authorization/AuthorizeService' /*'../api-authorization/AuthorizeService'*/

const AdminPocetnaStrana = () => {

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
            <AdministratorPocetnaStranica />
        </div>
    );
}

export default AdminPocetnaStrana;
