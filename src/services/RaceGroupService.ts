import axios, { AxiosResponse } from 'axios';

export interface Race {
    id: number,
    lanes: number[],
    created_at: string,
    updated_at: string,
    race_group_id: number,
    lanes_by_group_id: string[],
    lanes_by_clubber: string[]
}

export interface RaceGroup {
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
    is_finished: boolean,
    race_count: number,
}

export interface RaceResult {
    race_id: number,
    places: number[]
}

class RaceGroupService {

    static getCurrentRace(raceGroup: number): Promise<Race>  {
         return axios.get(`/race-groups/${raceGroup}/races/current`, {})
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static getNextRace(raceGroup: number): Promise<Race>  {
        return axios.get(`/race-groups/${raceGroup}/races/next`, {})
           .then((response) => {
               return response.data;
           })
           .catch(function (error) {
               console.log(error);
           });
   }

   static postRaceResults(raceGroup: number, raceResult: RaceResult): Promise<AxiosResponse> {
        return axios.post(`/race-groups/${raceGroup}/races/${raceResult.race_id}/result`,
            {
                result: raceResult
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
   }

   static getCurrentRaceGroup(): Promise<RaceGroup> {
    return axios.get('/race-groups/current', {})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
}

export default RaceGroupService;