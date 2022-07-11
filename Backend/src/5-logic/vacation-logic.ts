import dal from "../2-utils/dal";
import VocationModel from "../4-models/vacation-model";
import FollowModel from "../4-models/follow-model";

async function fetchAllVacations(id: number): Promise<VocationModel[]> {

  // Fetch all vacations: 

  const sql = `SELECT false AS 'follow', v1.*,
                          nvl((SELECT COUNT(1) 
                    FROM followed_vacations f4
                   WHERE f4.vacationId = v1.vacationId 
                GROUP BY f4.vacationId), 0) 
                      AS allFollowers
                    FROM vacations_details v1 
        WHERE NOT EXISTS (SELECT 1 
                    FROM followed_vacations S2
                   WHERE s2.vacationId = v1.vacationId 
                     AND S2.userId = ?)
                   UNION 
                         SELECT true, v2.*,
                          nvl((SELECT COUNT(1) 
                           FROM followed_vacations f3
                          WHERE f3.vacationId = v2.vacationId 
                       GROUP BY f3.vacationId), 0)
                             AS allFollowers
                           FROM vacations_details v2
                           JOIN followed_vacations f2
                             ON v2.vacationId = f2.vacationId 
                            AND f2.userId = ?
                       ORDER BY 1 DESC,
                                allFollowers DESC;`;

  // return vacations to user:
  const result = await dal.execute(sql, [id, id]);
  return result;

};

async function followVacation(follow: FollowModel) {

  // follow vacation:

  const sql = `INSERT INTO followed_vacations(vacationID, userID) 
                    VALUES (?, ?)`;

  await dal.execute(sql, [follow.vacationId, follow.userId]);

};

async function unFollowVacation(unFollow: FollowModel) {

  // unFollow vacation:
  const sql = `DELETE FROM followed_vacations 
                     WHERE userId =? 
                       AND vacationId = ?`;
  await dal.execute(sql, [unFollow.userId, unFollow.vacationId]);

};


export default {
  fetchAllVacations,
  followVacation,
  unFollowVacation,
}
