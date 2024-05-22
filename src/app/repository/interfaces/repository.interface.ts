import { IKeyValue } from "src/app/core/interfaces/generic.interface";
import { RepositoryProps } from "../enums/repository.props.enum";

export interface IRepository {
    [RepositoryProps.ID]: string;
    [RepositoryProps.Name]: string;
    [RepositoryProps.Description]: string;
    [RepositoryProps.NumberOfStars]: number;
    [RepositoryProps.OwnerName]: IKeyValue;
    [RepositoryProps.Language]: string;
    [RepositoryProps.LastUpdatedDate]: string;
    [RepositoryProps.URL]: string;

}