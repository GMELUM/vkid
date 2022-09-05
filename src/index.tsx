import React, { CSSProperties, FC, useEffect, useState } from 'react';

interface ILoginVKID {
    id: number;
    redirect: string;
    state?: string;

    host?: string;

    type?: string;
    radius?: number;
    height?: number;

    padding?: number;

    mode?: "default" | "name_phone" | "phone_name";
    skin?: "primary" | "flat";

    scheme?: "bright_light" | "space_gray";
    language?: number;

    showAlternativeLogin?: boolean;
    showAgreements?: boolean;
    showAgreementsDialog?: boolean;

    settings?: TSettings

    authSucess?: (data: TLoginSuccess) => void;
};

type TResizeFrame = { height: number; }
type TDataLoader = { uuid: string; }

type TLoginSuccess = {
    access_token: string;
    auth: number;
    hash: string;
    loadExternalUsers: boolean;
    token: string;
    ttl: number;
    type: string;
    uuid: string;
    user: {
        avatar: string;
        first_name: string;
        id: number;
        last_name: string;
        phone: string;
    }
}

type TSettings = {
    agreements?: string,
    promo?: string,
    vkc_behavior?: string,
    vkc_auth_action?: string,
    vkc_brand?: string,
    vkc_display_mode?: string,
}

const base64setting = (setting: Record<string, string>) => {
    const parts = ["agreements", "promo", "vkc_behavior", "vkc_auth_action", "vkc_brand", "vkc_display_mode", "service_groups", "external_device_id"];
    function w(e: Record<string, string>) { return Object.keys(e).filter((function (e) { return parts.includes(e) })) }
    var t = function (e) { return w(e).reduce((function (t: any, n) { return t[n] = e[n], t }), {}) }(setting);
    return escape(btoa(JSON.stringify(t)))
}

const uuidVK = () => {
    var result = '';
    var parts = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
    for (var i = 0; result.length < 21; i++) {
        result += parts.charAt(Math.floor(Math.random() * parts.length));
    }
    return result;
}

const LoginVKID: FC<ILoginVKID> = ({
    id,
    redirect,
    state,

    host = "id.vk.com",
    type = "button_one_tap_auth",
    radius = 8,
    height = 40,
    mode = "default",
    skin = "primary",

    scheme = "bright_light",
    language = 0,

    showAlternativeLogin,
    showAgreements,
    showAgreementsDialog,

    settings,

    authSucess
}) => {

    const [uuid, setUUID] = useState(uuidVK())
    const [heightFrame, setHeight] = useState(0);

    useEffect(() => {
        const handler = (event: any) => {
            console.log(event)
            const { handler, params } = event.data;
            switch (handler) {
                case "VKSDKOneTapResizeFrame": handlerResizeFrame(params); break;
                case "VKSDKOneTapAuthDataLoaded": handlerDataLoader(params); break;
                case "VKSDKOneTapAuthLoginSuccess": handlerLoginSuccess(params); break;
                case "VKSDKOneTapAuthFullAuthNeeded":
                case "VKSDKOneTapAuthPhoneValidationNeeded":
                case "VKSDKButtonOneTapAuthShowLogin": handlerWindowAuth(); break;
            }
        }

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [])

    const handlerResizeFrame = (params: TResizeFrame) => setHeight(params.height);
    const handlerDataLoader = (params: TDataLoader) => setUUID(params.uuid);
    const handlerLoginSuccess = (params: TLoginSuccess) => authSucess && uuid && authSucess(params);

    const handlerWindowAuth = () => {

        const params = new URLSearchParams({
            "app_id": id.toString(),
            "redirect_uri": redirect,
            "uuid": uuid,
            "redirect_state": state || "",
            "app_settings": base64setting(settings || {
                agreements: '',
                promo: '',
                vkc_behavior: '',
                vkc_auth_action: '',
                vkc_brand: '',
                vkc_display_mode: '',
            })
        }).toString();

        const a = document.createElement("a");
        a.target = "_self"
        a.href = `https://${host}/auth?${params}`
        a.click();

    }

    const params = new URLSearchParams({
        "app_id": id.toString(),
        "response_type": "silent_token",
        "origin": `${window.location.protocol}//${window.location.host}`,
        "uuid": uuid,
        "display": mode,
        "scheme": scheme,
        "button_skin": skin,
        "show_agreements": showAgreements ? "1" : "0",
        "show_alternative_login": showAlternativeLogin ? "1" : "0",
        "show_agreements_dialog": showAgreementsDialog ? "1" : "0",
        "style_height": height.toString(),
        "style_border_radius": radius.toString(),
        "lang_id": language.toString(),
        "app_settings": base64setting(settings || {
            agreements: '',
            promo: '',
            vkc_behavior: '',
            vkc_auth_action: '',
            vkc_brand: '',
            vkc_display_mode: '',
        })
    }).toString();

    const frameArgs = {
        title: "vkui_login",
        src: `https://${host}/${type}?${params}`,
        width: "100%",
        height: "100%",
        frameBorder: 0
    }

    const styleInner = {
        boxSizing: "border-box",
        padding: "24px"
    } as CSSProperties;

    return (
        <div style={styleInner}>
            <iframe {...frameArgs} style={{
                height: heightFrame,
                widows: "100%"
            }} />
        </div>
    );

}

export {
    LoginVKID,
    TLoginSuccess
};
