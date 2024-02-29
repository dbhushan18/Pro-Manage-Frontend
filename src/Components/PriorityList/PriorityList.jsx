import React from 'react'
import high from "../../assets/Board/high.png"
import moderate from "../../assets/Board/moderate.png"
import low from "../../assets/Board/low.png"

function PriorityList(props) {
  
  const priorityList = [
    {
        priority: "high priority",
        icon: `${high}`,
    },
    {
        priority: "moderate priority",
        icon: `${moderate}`,
    },
    {
        priority: "low priority",
        icon: `${low}`,
    },
]

const selectedPriority = priorityList.find(p => p.priority === props.priority);

  return (
    <>
    {}
    <div style={{textTransform:"uppercase"}} >
        <img src={selectedPriority?.icon} alt=""/> {" "}
        {props.priority}
    </div>
    </>
  )

}

export default PriorityList