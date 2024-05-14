document.addEventListener('DOMContentLoaded', () => {
    const contacts = [
        { company: "Eielson", name: "Amn/Faimly Readiness", phone: "2178", altPhone: "2161", email: "", address: "" },
        { company: "18th Fighter Squadron", name: "AGE", phone: "5022", altPhone: "5035", email: "", address: "" },
        { company: "Eielson", name: "AFLD Lighting (A/L)", phone: "4236", altPhone: "", email: "", address: "" },
        { company: "", name: "AMD", phone: "(315) 448-8888", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "AMMO", phone: "1297", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "ATOC", phone: "3257", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Baker Field House", phone: "1925", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Barrier Maintenance", phone: "1038", altPhone: "", email: "", address: "" },
        { company: "", name: "Barrier Maintenance Standby", phone: "(907) 978-0689", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Base Operator", phone: "1110", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Billeting", phone: "1844", altPhone: "(907) 385-6515", email: "", address: "" },
        { company: "", name: "C12 Ops", phone: "(907) 551-1950", altPhone: "(907) 551-1951", email: "", address: "" },
        { company: "Eielson", name: "CATM", phone: "2168", altPhone: "3089", email: "", address: "" },
        { company: "Eielson", name: "CE Customer Service", phone: "2100", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Clinic", phone: "6526", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "COMM CFC (Internet Issue)", phone: "2666", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Command Post", phone: "1500", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Command Post STE", phone: "6026", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Command Center (OIC)", phone: "3755", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Commissary", phone: "5134", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Corrosion Control Hanger", phone: "2664", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Crash Recovery", phone: "2124", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "CSC/SFS STE", phone: "9968", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "DFAC Kitchen", phone: "2563", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Education Center", phone: "5106", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Emergency Management", phone: "2149", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "EOD", phone: "4207", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Finance", phone: "2787", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Fire Department", phone: "4156", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "FOD Manager", phone: "3700", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Fuels", phone: "4190", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Front Gate", phone: "5263", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Geo Base", phone: "2596", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "HARM", phone: "3961", altPhone: "", email: "", address: "" },
        { company: "Fort Wainwright", name: "Airfield Mangement (AMOPS)", phone: "(907) 353-7212", altPhone: "", email: "", address: "" },
        { company: "Fort Wainwright", name: "Basset Hospital", phone: "(907) 361-5172", altPhone: "", email: "", address: "" },
        { company: "Fort Wainwright", name: "Command Post", phone: "(907) 353-3558", altPhone: "", email: "", address: "" },
        { company: "Fort Wainwright", name: "Range Control", phone: "(907) 353-1266", altPhone: "", email: "", address: "" },
        { company: "Fort Wainwright", name: "Tower", phone: "(907) 353-9208", altPhone: "", email: "", address: "" },
        { company: "Fort Wainwright", name: "Weather", phone: "(907) 353-7111", altPhone: "", email: "", address: "" },
        { company: "Fairbanks", name: "Customs", phone: "(907) 474-0307", altPhone: "", email: "", address: "" },
        { company: "Fairbanks", name: "FSS", phone: "(907) 474-0788", altPhone: "(907) 474-4952", email: "", address: "" },
        { company: "Fairbanks", name: "FSS FAX", phone: "(907) 474-0766", altPhone: "", email: "", address: "" },
        { company: "Fairbanks", name: "Operations", phone: "(907) 474-0137", altPhone: "", email: "", address: "" },
        { company: "Fairbanks", name: "Tower", phone: "(907) 474-0452", altPhone: "", email: "", address: "" },
        { company: "Fairbanks", name: "ARPT Manager", phone: "(907) 474-2552", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "JMC", phone: "3195", altPhone: "3199", email: "", address: "" },
        { company: "Eielson", name: "Legal Office", phone: "4114", altPhone: "4125", email: "", address: "" },
        { company: "Eielson", name: "LMR", phone: "3838", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Military Personnel Section", phone: "2400", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "MEO", phone: "1080", altPhone: "1359", email: "", address: "" },
        { company: "Eielson", name: "Natural Resources", phone: "5182", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Passenger (PAX) Terminal", phone: "1250", altPhone: "1854", email: "", address: "" },
        { company: "Eielson", name: "Protocol", phone: "7686", altPhone: "3660", email: "", address: "" },
        { company: "Eielson", name: "Public Health", phone: "6678", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Public Affairs", phone: "2116", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Range Control", phone: "3125", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "RAWS", phone: "1225", altPhone: "", email: "", address: "" },
        { company: "", name: "RAWS Standby", phone: "(907) 388-3858", altPhone: "", email: "", address: "" },
        { company: "", name: "Red Cross", phone: "(907) 444-9529", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Red Flag", phone: "2232", altPhone: "", email: "", address: "" },
        { company: "", name: "Rescue Coordination CNT", phone: "(907) 384-6726", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "(Flight) Safety", phone: "1125", altPhone: "4110", email: "", address: "" },
        { company: "", name: "SAR (CAP)", phone: "(907) 551-7230", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Security Forces (SFS)", phone: "5130", altPhone: "1333", email: "", address: "" },
        { company: "Eielson", name: "Small Arms Range", phone: "3089", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Snow Barn", phone: "1270", altPhone: "", email: "", address: "" },
        { company: "", name: "Sweeper/Snow 3", phone: "(907) 651-9623", altPhone: "", email: "", address: "" },
        { company: "", name: "Sweeper Standby", phone: "(907) 978-1850", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "SOF", phone: "2256", altPhone: "2251", email: "", address: "" },
        { company: "Eielson", name: "Spill Reporting (HAZMAT)", phone: "7745", altPhone: "", email: "", address: "" },
        { company: "", name: "TACC", phone: "(907) 779-0323", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Thunder Dome", phone: "4353", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Tower", phone: "2220", altPhone: "4960", email: "", address: "" },
        { company: "", name: "Tower Standby", phone: "(907) 385-5575", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Transient Alert (TA)", phone: "1264", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "UDM Office", phone: "3532", altPhone: "3539", email: "", address: "" },
        { company: "", name: "USDA Standby", phone: "(907) 687-9301", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Vehicle Dispatch (Transportation)", phone: "1843", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Vehicle Maitenance", phone: "4229", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Vehicle OPS", phone: "4396", altPhone: "2197", email: "", address: "" },
        { company: "Eielson", name: "Visitor Center", phone: "3807", altPhone: "", email: "", address: "" },
        { company: "Eielson", name: "Weather", phone: "3140", altPhone: "1160", email: "", address: "" },
        { company: "Eielson", name: "Wing XP", phone: "1690", altPhone: "2615", email: "", address: "" },
        { company: "Elmendorf", name: "Airfield Mangement (AMOPS)", phone: "(907) 552-2107", altPhone: "", email: "", address: "" },
        { company: "Elmendorf", name: "Airfield Mangement (AMOPS) FAX", phone: "(907) 552-9333", altPhone: "", email: "", address: "" },
        { company: "Elmendorf", name: "Command Post", phone: "(907) 552-3000", altPhone: "", email: "", address: "" },
        { company: "Elmendorf", name: "Operator", phone: "(907) 552-1110", altPhone: "", email: "", address: "" },
        { company: "Elmendorf", name: "Weather", phone: "(907) 552-4903", altPhone: "", email: "", address: "" },
        { company: "Anchorage", name: "ARTCC", phone: "(907) 269-1125", altPhone: "", email: "", address: "" },
        { company: "Anchorage", name: "ARTCC FAX", phone: "(907) 269-1343", altPhone: "", email: "", address: "" },
        { company: "Anchorage", name: "International Tower", phone: "(907) 271-6549", altPhone: "", email: "", address: "" },
        { company: "Anchorage", name: "Watch Supervisor", phone: "(907) 271-6549", altPhone: "", email: "", address: "" },
        { company: "168th", name: "Intel", phone: "8833", altPhone: "", email: "", address: "" },
        { company: "168th", name: "MOCC", phone: "8656", altPhone: "", email: "", address: "" },
        { company: "168th", name: "OPS", phone: "8855", altPhone: "", email: "", address: "" },
        { company: "168th", name: "Pro Sup Office", phone: "8912", altPhone: "", email: "", address: "" },
        { company: "168th", name: "Pro Super Cell", phone: "(907) 347-3507", altPhone: "", email: "", address: "" },
        { company: "168th", name: "STE", phone: "8815", altPhone: "", email: "", address: "" },
        { company: "168th", name: "Mission Planning", phone: "(907) 651-2435", altPhone: "", email: "", address: "" },
        { company: "168th", name: "CMSGT Ryan Allen (Emergency Only)", phone: "(907) 347-8285", altPhone: "", email: "", address: "" },
        { company: "168th", name: "SMSGT Ebinger (Questions)", phone: "(907) 385-9860", altPhone: "", email: "", address: "" },
        { company: "18th Fighter Squadron", name: "MOCC", phone: "1205", altPhone: "", email: "", address: "" },
        { company: "18th Fighter Squadron", name: "OPS", phone: "6164", altPhone: "2232", email: "", address: "" },
        { company: "18th Fighter Squadron", name: "Pro Super", phone: "(907) 388-1341", altPhone: "", email: "", address: "" },
        { company: "18th Fighter Squadron", name: "Scheduling", phone: "6234", altPhone: "", email: "", address: "" },
        { company: "210th", name: "OPS", phone: "3923", altPhone: "3920", email: "", address: "" },
        { company: "210th", name: "Superintendent (Cell)", phone: "(8137) 635-1212", altPhone: "", email: "", address: "" },
        { company: "353rd Red Flag/CTS", name: "MOCC", phone: "4463", altPhone: "", email: "", address: "" },
        { company: "353rd Red Flag/CTS", name: "OPS", phone: "2232", altPhone: "", email: "", address: "" },
        { company: "353rd Red Flag/CTS", name: "Scheduling", phone: "3961", altPhone: "", email: "", address: "" },
        { company: "353rd Red Flag/CTS", name: "Transportation", phone: "4681", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Africa", phone: "311", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Alaska", phone: "317", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Canada", phone: "319", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "CONUS/Puerto Rico", phone: "312", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Central/Middle East", phone: "318", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Europe", phone: "314", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Operator", phone: "(312) 231-1311", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Out Of Country", phone: "970-1149 (+ Requested Number)", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Pacific", phone: "315", altPhone: "", email: "", address: "" },
        { company: "DSN", name: "Phone Long Distance PIN", phone: "(4) 451-2658", altPhone: "", email: "", address: "" },
        { company: "356th Fighter Squadron", name: "MOCC", phone: "1205", altPhone: "", email: "", address: "" },
        { company: "356th Fighter Squadron", name: "OPS", phone: "356", altPhone: "", email: "", address: "" },
        { company: "356th Fighter Squadron", name: "Pro Super", phone: "9858", altPhone: "", email: "", address: "" },
        { company: "356th Fighter Squadron", name: "Scheduling", phone: "7180", altPhone: "3516", email: "", address: "" },
        { company: "355th Fighter Squadron", name: "MOCC", phone: "1205", altPhone: "", email: "", address: "" },
        { company: "355th Fighter Squadron", name: "OPS", phone: "7625", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "OSA/CC", phone: "3116", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "Airfield Manager (AFM)", phone: "3233", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "Deputy Airfield Manager (DAFM)", phone: "4566", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "Wing Airfield Driving Program Manager (WADPM)", phone: "7777", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "NCOIC of Airfield Management Operations (NAMO)", phone: "4107", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "NCOIC of Airfield Management Training (NAMT)", phone: "3622", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "Flight Planning Room", phone: "2136", altPhone: "4566", email: "", address: "" },
        { company: "AMOPS Flight", name: "AMOPS STE", phone: "3598", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "OSAT Chief Controller", phone: "7050", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "OSAT Assistant Chief Controller", phone: "4368", altPhone: "", email: "", address: "" },
        { company: "AMOPS Flight", name: "OSAT NATCT", phone: "1233", altPhone: "", email: "", address: "" },
        { company: "Command Section", name: "OSS/CC", phone: "2841", altPhone: "", email: "", address: "" },
        { company: "Command Section", name: "OSS/DO", phone: "2612", altPhone: "", email: "", address: "" },
        { company: "Command Section", name: "OSS/CSS", phone: "3831", altPhone: "", email: "", address: "" },
        { company: "Command Section", name: "OG/Shirt", phone: "3046", altPhone: "", email: "", address: "" },
        { company: "Command Section", name: "Superintendent", phone: "2575", altPhone: "", email: "", address: "" },
        { company: "Command Section", name: "Secretary Admin", phone: "2686", altPhone: "", email: "", address: "" },
        { company: "Current Operations", name: "Wing Scheduling", phone: "6234", altPhone: "", email: "", address: "" },
        { company: "Current Operations", name: "Scheduling NCOIC", phone: "6237", altPhone: "", email: "", address: "" },
        { company: "Current Operations", name: "Current OPS NCOIC", phone: "6234", altPhone: "", email: "", address: "" },
        { company: "Intel", name: "Intel", phone: "7652", altPhone: "", email: "", address: "" },
        { company: "Intel", name: "Intel/SIO", phone: "1892", altPhone: "", email: "", address: "" },
        { company: "Intel", name: "Intel/NCOIC", phone: "1142", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "AMD STE", phone: "(315) 448-1341", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "ARFF", phone: "2613", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "CTS", phone: "1037", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Elmendorf SOF", phone: "(907) 552-3010", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Elmendorf 90th OPS", phone: "(907) 551-9000", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "OT", phone: "6978", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "TACC COMM", phone: "(618) 229-0328", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "UCC", phone: "1189", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "44th OPS", phone: "1037", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Mission Control For Fighter Movement", phone: "(312) 574-5967", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Dean Sprague", phone: "4353", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Alert Force CC (AFC)", phone: "3111", altPhone: "6166", email: "", address: "" },
        { company: "Miscellaneous", name: "DO (Cell)", phone: "(907) 385-2065", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Fairbanks Customs Standby", phone: "(907) 2716-313 EXT 0", altPhone: "", email: "", address: "" },
        { company: "Miscellaneous", name: "Eric Gadow (CTS)", phone: "3888", altPhone: "", email: "", address: "" }
    ];

    const contactList = document.getElementById('contactList');
    const searchInput = document.getElementById('searchInput');

    const renderContacts = (contacts) => {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const card = document.createElement('div');
            card.className = 'contact-card';

            if (contact.company) {
                const company = document.createElement('div');
                company.className = 'company-name';
                company.textContent = contact.company;
                card.appendChild(company);
            }

            const name = document.createElement('h3');
            name.textContent = contact.name;
            card.appendChild(name);

            const phone = document.createElement('p');
            phone.innerHTML = `<img src="../resources/phone-icon.png" alt="Phone" class="phone-icon"> ${contact.phone}`;
            card.appendChild(phone);

            if (contact.altPhone) {
                const altPhone = document.createElement('p');
                altPhone.innerHTML = `<img src="../resources/phone-icon.png" alt="Phone" class="phone-icon"> ${contact.altPhone}`;
                card.appendChild(altPhone);
            }

            if (contact.email || contact.address) {
                const toggleInfo = document.createElement('button');
                toggleInfo.className = 'toggle-info';
                toggleInfo.textContent = '+';
                toggleInfo.onclick = () => {
                    additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';
                    toggleInfo.textContent = toggleInfo.textContent === '+' ? '-' : '+';
                };
                card.appendChild(toggleInfo);

                const additionalInfo = document.createElement('div');
                additionalInfo.className = 'additional-info';
                additionalInfo.style.display = 'none';

                if (contact.email) {
                    const email = document.createElement('p');
                    email.textContent = `Email: ${contact.email}`;
                    additionalInfo.appendChild(email);
                }

                if (contact.address) {
                    const address = document.createElement('p');
                    address.textContent = `Address: ${contact.address}`;
                    additionalInfo.appendChild(address);
                }

                card.appendChild(additionalInfo);
            }

            contactList.appendChild(card);
        });
    };

    const filterContacts = (searchTerm) => {
        const filteredContacts = contacts.filter(contact => {
            return Object.values(contact).some(value =>
                value && value.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        renderContacts(filteredContacts);
    };

    searchInput.addEventListener('input', () => {
        filterContacts(searchInput.value);
    });

    renderContacts(contacts);
});
