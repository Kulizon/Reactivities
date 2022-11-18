import { Header, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../../interfaces/Activity";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityTile from "../ActivityTile/ActivityTile";

const ActivityList = () => {
  const { groupedActivities } = useStore().activityStore;

  return (
    <>
      {groupedActivities.map(([date, activities]) => (
        <div key={date} style={{marginTop: '2rem'}}>
          <Header sub color="teal">
            {date}
          </Header>

          <Segment>
            <Item.Group divided>
              {activities.map((a: Activity) => (
                <ActivityTile activity={a} key={a.id}></ActivityTile>
              ))}
            </Item.Group>
          </Segment>
        </div>
      ))}
    </>
  );
};

export default observer(ActivityList);
