import React, { FC, HTMLAttributes } from "react";
import { LoginVKID } from "./dist";

interface IApp extends HTMLAttributes<HTMLDivElement> { }

const App: FC<IApp> = () => {
    return (
        <div className="Login">

            <LoginVKID

                id={51416274}
                redirect={"https://dev.elum.team/login"}
                state={"any_data"}

                showAgreements
                showAgreementsDialog
                showAlternativeLogin

                radius={8}
                height={40}

                mode={"default"}
                skin={"primary"}

                scheme={"bright_light"}
                language={0}

                settings={{
                    agreements: '',
                    promo: '',
                    vkc_behavior: '',
                    vkc_auth_action: '',
                    vkc_brand: '',
                    vkc_display_mode: '',
                }}

                authAlternative={() => console.log("Альтернативная авторизация")}

                authSuccess={(data) => console.log(data)}

            />

        </div>
    )
}

export default App;
