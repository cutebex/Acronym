import { CreateDataDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
// import { Acronym } from '@/interfaces/acronym.interface';
import userModel from '@models/acronym.model';
import { isEmpty } from '@utils/util';
import fs from 'fs';
import path from 'path';

class AcronymService {
  public acronym = userModel;

  public async findAllUser(): Promise<any[]> {
    const acronym: any[] = this.acronym;
    return acronym;
  }

  public async findDataByFilter(from: number, limit: number, search: string): Promise<any> {
    const findData: any = this.acronym;
    if (!findData) throw new HttpException(409, "Data doesn't exist");
    return findData[0].slice(from - 1, from + limit - 1);
  }

  public async createData(data: CreateDataDto): Promise<any> {
    this.acronym[0].map((key: any) => {
      if (Object.keys(key)[0] === data.acronym) {
        throw new HttpException(409, 'Data already exist');
      }
    });

    const createUserData: any = { ...data };
    this.acronym[0].push({ [data.acronym]: data.definition });
    const newData = JSON.stringify(this.acronym);
    fs.writeFile(path.join(process.cwd() + '/acronym.json'), newData, 'utf8', function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
      console.log('JSON file has been saved.');
    });
    return createUserData;
  }

  public async updateData(acronym: string, definition: string): Promise<any[]> {
    if (isEmpty(definition)) throw new HttpException(400, 'definition is empty');
    const newArr = [];
    this.acronym[0].map((key: any) => {
      if (Object.keys(key)[0] === acronym) {
        newArr.push(definition);
      }
    });

    if (newArr.length === 0) {
      throw new HttpException(409, "Acronym doesn't exist");
    }

    const newData = [];
    this.acronym[0].map((key: any) => {
      if (Object.keys(key)[0] === acronym) {
        newData.push({ [Object.keys(key)[0]]: definition });
      } else {
        newData.push({ [Object.keys(key)[0]]: key[Object.keys(key)[0]] });
      }
    });
    fs.writeFile(path.join(process.cwd() + '/acronym.json'), JSON.stringify(newData), 'utf8', function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
      console.log('JSON file has been saved.');
    });

    return newArr;
  }

  public async deleteData(acronym: string): Promise<any[]> {
    const newArr = [];
    this.acronym[0].map((key: any) => {
      if (Object.keys(key)[0] === acronym) {
        newArr.push(acronym);
      }
    });

    if (newArr.length === 0) {
      throw new HttpException(409, "Acronym doesn't exist");
    }

    const newData = [];
    this.acronym[0].map((key: any) => {
      if (Object.keys(key)[0] !== acronym) {
        newData.push({ [Object.keys(key)[0]]: key[Object.keys(key)[0]] });
      }
    });
    fs.writeFile(path.join(process.cwd() + '/acronym.json'), JSON.stringify(newData), 'utf8', function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
      console.log('JSON file has been saved.');
    });

    return newArr;
  }
}

export default AcronymService;
