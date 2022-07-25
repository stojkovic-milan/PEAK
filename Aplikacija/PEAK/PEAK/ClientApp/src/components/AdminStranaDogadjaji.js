import React from 'react';
import AdministratorStranicaDogadjaji from './NaseKomponente/AdministratorStranicaDogadjaja';
import Footer from './NaseKomponente/Footer';
import authService from './api-authorization/AuthorizeService' /*'../api-authorization/AuthorizeService'*/

const AdminStranaDogadjaji = () => {

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
            <AdministratorStranicaDogadjaji />
            <Footer />
        </div>
    );
}

export default AdminStranaDogadjaji;
