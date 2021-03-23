<style lang='scss'>
    footer{
        margin-left: 32px;
        padding-left: 32px;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-right: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(255,255,255,0.15);
        -webkit-border-top-left-radius: 16px;
        -moz-border-radius-topleft: 16px;
        border-top-left-radius: 16px; 
        a{
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            text-transform: uppercase;
            text-decoration:none;
        }
        ul, li {
            list-style: none;
            margin: 0;
            padding:0;
        }
        li{
            margin-bottom: 8px;
            &:last-child(){
                margin: 0;
            }
        }
        @media screen and (max-width: 1024px){
            // Petit Desktop
        }
        @media screen and (max-width: 768px){
            // Tablette
        }
        @media screen and (max-width: 425px){
            // Mobile
            margin-left: 0px;
			padding-left: 16px;
			padding-right: 16px;
            &>a{
                display: none;
            }
			a{
				font-size: 14px;
			}
        }
    }
</style>

<footer>
    <ul>
        <li><a href='.'>01 ⁕ Home</a></li>
        <li><a href='index-list'>02 ⁕ Index</a></li>
        <li><a href='about'>03 ⁕ About</a></li>
    </ul>
    <a href='contact'>Contact</a>
    <ul>
        <li><a href='https://www.instagram.com/walt_dona/' target='_blank'>04 ⁕ Instagram</a></li>
        <li><a href='https://www.linkedin.com/in/dona%C3%ABl-walter/' target='_blank'>05 ⁕ Linkedin</a></li>
        <li><a href='https://github.com/Donawalt/' target='_blank'>06 ⁕ Github</a></li>
    </ul>
</footer>