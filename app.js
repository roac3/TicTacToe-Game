window.addEventListener('load', ()=>{
    const game_container = document.querySelector('.game_container');
    const player_turn = document.querySelector('.player_turn');
    const restart = document.querySelector('.restart');
    const pointsO = document.querySelector('.o_p');
    const pointsX = document.querySelector('.x_p');
    const pointsDraw = document.querySelector('.draw_p');
    const winner_title = document.querySelector('.winner_title');
    const winner_pop = document.querySelector('.winner_popup');
    const continue_btn = document.querySelector('.continue_btn');
    const reset_btn = document.querySelector('.reset_btn');

    var GAME_STATUS = ['','','','','','','','',''];
    const wincondition = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2]
        ]

    var o_points = 0;
    var x_points = 0;
    var draw_points = 0;

    var Player_turn = 'X';
    var Playabe = true;

    player_turn.innerHTML = "Turn " + Player_turn;

    game_container.addEventListener('click', (e)=>{

        if (Playabe == true){

            const ClickedCell = e.target;

            if(ClickedCell.classList.contains('gamecell') && ClickedCell.innerHTML == ''){
                ClickedCell.innerHTML = Player_turn;
                const clickedCellIndex = Array.from(ClickedCell.parentNode.children).indexOf(ClickedCell);
                
                if(Player_turn == 'O'){
                    ClickedCell.classList.add('OStyle');
                }else if(Player_turn =='X'){
                    ClickedCell.classList.add('XStyle');
                }

                if (GAME_STATUS[clickedCellIndex] == ''){
                    GAME_STATUS[clickedCellIndex] = Player_turn;
                }
            }
    
            for ( var i = 0; i < wincondition.length; i++){
    
                let winnumber = wincondition[i];
    
                let pos1 = GAME_STATUS[winnumber[0]],
                    pos2 = GAME_STATUS[winnumber[1]],
                    pos3 = GAME_STATUS[winnumber[2]];
    
                    if( pos1 == '' || pos2 == '' || pos3 == ''){
                        continue
                    }else if (pos1 == pos2 && pos2 == pos3){
                        if(Player_turn == 'O'){
                            o_points++;
                            pointsO.innerHTML = o_points;
                            winnerMsg();
                        } else if(Player_turn == 'X'){
                            x_points++;
                            pointsX.innerHTML = x_points;
                            winnerMsg();
                        }
                        Playabe = false;
                        break
                    }
            }
            
            let drawGame = !GAME_STATUS.includes('')
            if(drawGame){
                draw_points++;
                pointsDraw.innerHTML = draw_points;
                cleanBoard();
            }

            if (Player_turn == 'O'){
                Player_turn = 'X';
            }else if(Player_turn =='X'){
                Player_turn = 'O';
            }

            player_turn.innerHTML = "Turn " + Player_turn;
        }
        
    });

    function cleanBoard(){
        GAME_STATUS = ['','','','','','','','',''];
        var gamecell = document.querySelectorAll('.gamecell')

        gamecell.forEach((cell) =>{
        cell.innerHTML = '';
        cell.classList.remove('OStyle');
        cell.classList.remove('XStyle');
        });
        
    }

    function winnerMsg(){
        winner_title.innerHTML = Player_turn + ' Won the Round!';
        winner_pop.classList.add('active_popup');
    }

    continue_btn.addEventListener('click',()=>{
        winner_pop.classList.remove('active_popup');
        cleanBoard();
        Playabe = true;
    });

    reset_btn.addEventListener('click',()=>{
        winner_pop.classList.remove('active_popup');
        cleanBoard();
        Playabe = true;
        o_points = 0;
        x_points = 0;
        draw_points = 0;

        pointsO.innerHTML = o_points;
        pointsX.innerHTML = x_points;
        pointsDraw.innerHTML = draw_points;
    });

    restart.addEventListener('click',()=>{
    Playabe = true;
    cleanBoard();
    });

});