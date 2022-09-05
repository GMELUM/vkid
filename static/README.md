# [![GitHub license](https://badgen.net/badge/license/MIT/blue)](https://github.com/GMELUM/vkid/blob/master/LICENSE) [![npm bundle size](https://img.shields.io/bundlephobia/min/@elum/vkid)](https://bundlephobia.com/result?p=@elum/vkid) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@elum/vkid)](https://bundlephobia.com/result?p=@elum/vkid)

# @elum/vkid

Данная библиотека представляет из себя react компонент упрощающий авторизацию через платформу VK ID.
Официальный пакет для работы с [VK ID](https://www.npmjs.com/package/@vkontakte/superappkit)

@elum/vkid : ________________ ![npm bundle size](https://img.shields.io/bundlephobia/min/@elum/vkid)
@vkontakte/superappkit _____   ![npm bundle size](https://img.shields.io/bundlephobia/min/@vkontakte/superappkit)

## Установка

#### YARN
	yarn add @elum/vkid
 #### NPM
	npm i -s @elum/vkid

## Использование

```ts
import React, { FC, HTMLAttributes } from  "react";
import { LoginVKID } from  "@elum/vkid";

interface IApp extends HTMLAttributes<HTMLDivElement> { };

const App: FC<IApp> = () => (
	<div className="Login">
		<LoginVKID
			id={11111111}
			redirect={"https://example.com/login"}
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
			authAlternative={() =>  console.log("Альтернативная авторизация")}
			authSuccess={(data) =>  console.log(data)}
		/>
	</div>
);


export  default  App;

```
***
| Параметр | Тип |  Описание | default |
|--|--|--|--|
| **id**  | number  |  ID приложения, от лица которого будет работать SDK. | - |
| **redirect** | string | URL для перехода в случае если пользователь не зарегистрирован/авторизирован в ВК | - |
| **state** | string | Данные которые будут находится в query в url после успешной авторизации | " "|
| **showAgreements** | boolean | Показывать политики под кнопкой | false |
| **showAlternativeLogin** | boolean | Показывать кнопку альтернативной авторизации | fasle |
| showAgreementsDialog | boolean | Показывать окно подтверждения политик (если выключен showAgreements ) (**В разработке**)| **dev** |
| **radius** | number | Радиус скругления кнопок | 8 |
|**mode**| "default"  \|  "name_phone"  \|  "phone_name" | Вид отображения данных пользователя | "default" |
|**skin** | "primary" \| "flat" | Стиль основной кнопки | "primary"|
|**scheme** | "bright_light"  \|  "space_gray" | Цветовая схема формы авторизации | "bright_light"|
|**language** | number | Язык | 0 |
|**settings**| { *** } | Глобальные настройки приложения | {} 
|**authAlternative**| () => {} | Событие вызывающее callback при нажатии пользователем на кнопку альтернативной авторизации| null |
|**authSuccess**| (data) => {} | Событие вызывающее callback при успешной авторизации пользователя методом OneTap | null|

***

### Тип ответа authSuccess

```ts
payload:
  {
  auth: number;
  token: string;
  ttl: number;
  type: string;
  user:  {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  phone: string;
  };
  uuid: string;
  oauthProvider?: string;
  external_user?:  ExternalUser;
};
```