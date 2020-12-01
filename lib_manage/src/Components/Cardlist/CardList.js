import React from 'react';
import Card from '../Card/Card';
import  './CardList.css';


const CardList = ({ robots }) => {
  return (
    <div>
    <div className="gridlayout">
      { 
        robots.map((user, i) => {

          return (
            <Card
              key={i}
              cand_elec_id={robots[i].cand_elec_id}
              cand_imgsrc={robots[i].cand_imgsrc}
              cand_name={robots[i].cand_name}
              cand_id={robots[i].cand_id}
              cand_branch={robots[i].cand_branch}
              cand_manifesto={robots[i].cand_manifesto}
              cand_intro={robots[i].cand_intro}
            />
          );
        })
      }
    </div>
    </div>
  );
}

export default CardList;