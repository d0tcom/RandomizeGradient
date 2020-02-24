/*
    Randomize Gradient est un projet Javascript personnel.
    C'est une application qui sert à trouver des dégradés de couleurs (2 couleurs).
    Les couleurs sont générées totalement aléatoirement en RGB(X,X,X).
    Chaque X est un nombre généré aléatoirement entre 0 et 256 (256 non compris).
    L'application converti les couleurs RGB en hexadécimal et affiche son code couleur.
    L'utilisateur peut alors copier les codes couleurs dans son presse papier mais aussi le code CSS.
*/
/*
    Fonctionnalités à ajouter :

    - Detection de la langue du navigateur, FR ou ENG (changement du texte bouton)
    - Bouton pour faire une rotation du gradient.

    Made by Jordan Lebrethon aka j0wz/d0tcom - 2020
*/

class Randomize_Gradient {

    constructor () {
        this.button_copy = document.getElementById('btn-copy');                                 // Bouton Click to copy
        this.button_randomize = document.querySelector('.btn-randomize');                       // Bouton Randomize gradient!
        this.color_code_button1 = document.querySelector('.colors-output').children[0];         // Bouton code couleur 1
        this.color_code_button2 = document.querySelector('.colors-output').children[1];         // Bouton code couleur 2
        this.css_code_button = document.querySelector('.code-btn').children[0];                 // Bouton modal code css
        this.modal_code = document.querySelector('.modal-mask');                                // Modal code
        this.color1 = [];                                                                       // Stockage de la première couleur dans un tableau vide (3 nombres)
        this.color2 = [];                                                                       // Stockage de la deuxième couleur dans un tableau vide (3 nombres)
        this.rgb1 = null;                                                                       // Stockage de la première couleur sous forme string rgb(x, x, x)
        this.rgb2 = null;                                                                       // Stockage de la deuxième couleur sous forme string rgb(x, x, x)
        this.hex1 = null;                                                                       // Première couleur en hexa
        this.hex2 = null;                                                                       // Deuxième couleur en hexa
        this.random_colors();
        this.background_change(this.rgb1, this.rgb2);
        this.span_colors_output(this.hex1, this.hex2);
        this.css_values = null;
    }
    // Fonction qui permet de générer une ou plusieurs couleurs rgb
    random_color(number_of_color = 3) {
        let colors_array = [];
        for (let i = 0; i < number_of_color; i++) {
            colors_array.push(Math.round(Math.random() * 256))
        }
        return colors_array;
    }
    // Fonction qui génère aléatoirement deux couleurs en rgb et hexa
    random_colors() {
         // On génère des couleurs aléatoires entre 0 et 255 que l'on arrondit. (et on les stock dans deux tableaux différents)
        this.color1 = this.random_color();
        this.color2 = this.random_color();
        // On stock les couleurs qui sont dans les tableaux colorX sous forme rgb(x,x,x)
        this.rgb1 = `rgb(${this.color1[0]}, ${this.color1[1]}, ${this.color1[2]})`;
        this.rgb2 = `rgb(${this.color2[0]}, ${this.color2[1]}, ${this.color2[2]})`;
        // On stock les couleurs qui sont dans les tableaux colorX sous forme hexadecimale (#FFFFFF)
        this.hex1 = `${this.rgb_to_hex(this.color1[0], this.color1[1], this.color1[2])}`
        this.hex2 = `${this.rgb_to_hex(this.color2[0], this.color2[1], this.color2[2])}`
    }
    // Fonction qui converti un nombre en hexadecimal (base 16). Si ce nombre ne possède qu'un seul chiffre, on rajoute un 0 devant.
    number_to_hex(number) {
        let hex = number.toString(16);
        if (hex.length == 1) {
            return hex = "0" + hex;
        } else {
            return hex;
        }
    }
    // Fonction qui converti une couleur rgb en hexadecimal
    rgb_to_hex(r = 0, g = 0, b = 0) {
        let hex_nb = null;
        let nb1 = this.number_to_hex(r);
        let nb2 = this.number_to_hex(g);
        let nb3 = this.number_to_hex(b);
        return this.hex_nb = `#${nb1}${nb2}${nb3}`;
    }
    // Fonction qui change le background
    background_change(color1, color2) {
        // Changement du background avec les valeurs générés aléatoirements (rgb1 et rgb2)
        let container = document.querySelector('.container');
        container.style.background = `linear-gradient(145deg, ${color1}, ${color2})`;
    }
    // Fonction qui change la valeur des codes couleurs et sa petite icône
    span_colors_output(hex_color1, hex_color2) {
        let span1_icon = document.querySelector('.color-1');
        let span1_text = document.querySelector('.code-1');

        let span2_icon = document.querySelector('.color-2');
        let span2_text = document.querySelector('.code-2');

        // On modifie le contenu des span par la valeur hexadecimal de la première couleur (on utilise la méthode rgb_to_hex() précédemment crée)
        span1_text.textContent = `${hex_color1}`;
        span2_text.textContent = `${hex_color2}`;
        // On modifie la couleur des icônes (span carré)
        span1_icon.style.backgroundColor = `${hex_color1}`;
        span2_icon.style.backgroundColor = `${hex_color2}`;
    }
    // Fonction qui permet de copier dans le presse-papier
    copy_to_clipboard(value) {
    // On créer un textarea
    let text_area = document.createElement('textarea');
    // On insert dans celui-ci la valeur de rg.hex1
    text_area.value = value;
    // On l'insert dans le body
    document.body.appendChild(text_area);
    // On le selectionne et on copie dans le presse papier
    text_area.select();
    document.execCommand('copy')
    // On supprime le textarea temporaire.
    text_area.remove();
    }
    // Fonction qui affiche la modal du code css à copier
    show_css_code_menu() {
        this.modal_code.style.display = 'flex';
        this.show_css_code();
    }
    // Fonction qui ferme la modal du code css à copier
    close_css_code_menu() {
        if (event.target == this.modal_code) {
            this.modal_code.style.display = 'none';
        }
    }
    // Fonction qui affiche le code css dans le textarea de la modal code.
    show_css_code() {
        let text_area = document.getElementById('code');
        text_area.textContent = `background: linear-gradient(to left, ${this.hex1}, ${this.hex2});
background: -webkit-linear-gradient(to left, ${this.hex1}, ${this.hex2}); /* Chrome */
background: -o-linear-gradient(left, ${this.hex1}, ${this.hex2}); /* Opera */
background: -moz-linear-gradient(left, ${this.hex1}, ${this.hex2}); /* Old Firefox versions */`;
        this.css_values = text_area.textContent;
    }
}

class More_Gradients {

    constructor () {
        this.button_menu = document.querySelector('.more-gradients'); // Récupération du bouton du menu
        this.menu_div = document.querySelector('.menu');
        this.elements_number = 10; // Nombre de dégradés générés dans le menu.
    }
    // Fonction qui permet de fermer le menu des dégradés
    close_menu() { 
            this.menu_div.classList.toggle('active');
            for (let j = 0; j < this.elements_number; j++) {
                this.menu_div.removeChild(this.menu_div.lastChild);
            }           
    }
    // Affichage du menu (On créer 10 div (propositions de dégradés))
    show_menu() {
        if (this.menu_div.className === 'menu active') {
            this.close_menu();
        } else {
            // Sinon si le menu n'est pas ouvert
            // On ouvre le menu (active)
            this.menu_div.classList.toggle('active');
            // On créer des div 'gradient-i'
            for (let i = 0; i < this.elements_number; i++) {
                // Chacune aura un dégradé de couleur aléatoire
                let colors = rg.random_color(6);
                let gradient_color = `linear-gradient(145deg, rgb(${colors[0]}, ${colors[1]}, ${colors[2]}), rgb(${colors[3]}, ${colors[4]}, ${colors[5]}))`;
                // On converti les deux couleurs en hexadecimal
                let hex1 = rg.rgb_to_hex(colors[0], colors[1], colors[2]);
                let hex2 = rg.rgb_to_hex(colors[3], colors[4], colors[5]);

                let element_gradient = document.createElement('div');
                element_gradient.className = `gradient-${i}`;
                // On ajoute du style à la div
                element_gradient.style.cssText = `width: 80%; margin: 20px auto; height: 150px; display: block; background: ${gradient_color}; cursor: pointer;`
                this.menu_div.appendChild(element_gradient);
                // Changement du background au click d'un dégradé et fermeture du menu, on assigne les nouvelles couleurs dans rg.hex
                element_gradient.addEventListener('click', function (e) {
                    rg.background_change(`rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`, `rgb(${colors[3]}, ${colors[4]}, ${colors[5]})`);
                    mg.close_menu();
                    rg.span_colors_output(hex1, hex2)
                    rg.hex1 = hex1;
                    rg.hex2 = hex2;
                })

            }
        }              
    }

}

// On appel une classe Randomize_Gradient() et More_Gradients()
const rg = new Randomize_Gradient();
const mg = new More_Gradients(); 

// Click sur le bouton Randomize gradient!
rg.button_randomize.addEventListener('click', function () {
    rg.random_colors();
    rg.background_change(rg.rgb1, rg.rgb2);
    rg.span_colors_output(rg.hex1, rg.hex2);
});
// Click sur le bouton code couleur 1
rg.color_code_button1.addEventListener('click', function () {
    let color_code = document.querySelector('.colors-output').children[0].children[2];
    // On créer un textarea temporaire dans le body, on y ajoute à l'intérieur la valeur de hex1
    rg.copy_to_clipboard(rg.hex1);
    // On joue l'animation 'Copied!'
    color_code.style.display = 'block';
    setTimeout(function(){ color_code.style.display = 'none'; }, 500);
});
// Click sur le bouton code couleur 2
rg.color_code_button2.addEventListener('click', function () {
    let color_code = document.querySelector('.colors-output').children[1].children[2];
    // On créer un textarea temporaire dans le body, on y ajoute à l'intérieur la valeur de hex2
    rg.copy_to_clipboard(rg.hex2);
    // On joue l'animation 'Copied!'
    color_code.style.display = 'block';
    setTimeout(function(){ color_code.style.display = 'none'; }, 500);
});
// Click sur le bouton du menu en haut
mg.button_menu.addEventListener('click', function () {
    mg.show_menu();
})
// Click sur le bouton code modal
rg.css_code_button.addEventListener('click', function () {
    rg.show_css_code_menu();
})
// Click en dehors de la modal
rg.modal_code.addEventListener('click', function () {
    rg.close_css_code_menu();
})
// Click sur le bouton Click to copy
rg.button_copy.addEventListener('click', function () {
    let color_code = document.querySelector('.modal').children[2].children[1];
    rg.copy_to_clipboard(rg.css_values);
    // On joue l'animation 'Copied!'
    color_code.style.display = 'block';
    setTimeout(function(){ color_code.style.display = 'none'; }, 500);
})