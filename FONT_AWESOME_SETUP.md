# Como usar Font Awesome no projeto

## 1. Instalação

Execute no terminal:
```bash
npm install --save @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```

## 2. Como usar em componentes

### Exemplo básico:

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'

function MeuComponente() {
  return (
    <div>
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faHeart} />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  )
}
```

### Com estilização:

```tsx
<FontAwesomeIcon icon={faStar} size="2x" color="#ffd700" />
<FontAwesomeIcon icon={faSearch} className="minha-classe" />
```

### Ícones de marcas (brands):

```tsx
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

<FontAwesomeIcon icon={faGithub} />
<FontAwesomeIcon icon={faTwitter} />
```

## 3. Propriedades úteis

- `icon`: O ícone a ser exibido (obrigatório)
- `size`: Tamanho ("xs", "sm", "lg", "2x", "3x", etc.)
- `color`: Cor do ícone
- `className`: Classes CSS personalizadas
- `spin`: Animação de rotação (boolean)
- `pulse`: Animação de pulso (boolean)
- `rotation`: Rotação (90, 180, 270)

## 4. Exemplo prático no Header

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons'

<NavLink to="/">
  <FontAwesomeIcon icon={faHome} /> Em Alta!
</NavLink>
<FontAwesomeIcon icon={faSearch} />
```

