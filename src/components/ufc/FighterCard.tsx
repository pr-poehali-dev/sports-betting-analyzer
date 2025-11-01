import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Fighter } from './types';

interface FighterCardProps {
  fighter: Fighter;
  fighterNum: 1 | 2;
  onUpdate: (field: keyof Fighter, value: string | number) => void;
  onLoadFighter: (fighterKey: string) => void;
  availableFighters: Record<string, Fighter>;
}

const FighterCard = ({ fighter, fighterNum, onUpdate, onLoadFighter, availableFighters }: FighterCardProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Icon name="User" size={20} className="text-primary-foreground" />
        </div>
        <h4 className="text-lg font-bold text-foreground">Боец {fighterNum}</h4>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Загрузить топ-бойца</Label>
          <Select onValueChange={(value) => onLoadFighter(value)}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue placeholder="Выберите бойца..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(availableFighters).map(([key, f]) => (
                <SelectItem key={key} value={key}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`name-${fighterNum}`}>Имя бойца</Label>
          <Input
            id={`name-${fighterNum}`}
            value={fighter.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Например: Хабиб Нурмагомедов"
            className="bg-input border-border"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label htmlFor={`wins-${fighterNum}`}>Победы</Label>
            <Input
              id={`wins-${fighterNum}`}
              type="number"
              value={fighter.wins}
              onChange={(e) => onUpdate('wins', parseInt(e.target.value) || 0)}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`losses-${fighterNum}`}>Поражения</Label>
            <Input
              id={`losses-${fighterNum}`}
              type="number"
              value={fighter.losses}
              onChange={(e) => onUpdate('losses', parseInt(e.target.value) || 0)}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`draws-${fighterNum}`}>Ничьи</Label>
            <Input
              id={`draws-${fighterNum}`}
              type="number"
              value={fighter.draws}
              onChange={(e) => onUpdate('draws', parseInt(e.target.value) || 0)}
              className="bg-input border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`strike-${fighterNum}`}>Точность ударов: {fighter.strikeAccuracy}%</Label>
          <Input
            id={`strike-${fighterNum}`}
            type="range"
            min="0"
            max="100"
            value={fighter.strikeAccuracy}
            onChange={(e) => onUpdate('strikeAccuracy', parseInt(e.target.value))}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`takedown-${fighterNum}`}>Успех тейкдаунов: {fighter.takedownAccuracy}%</Label>
          <Input
            id={`takedown-${fighterNum}`}
            type="range"
            min="0"
            max="100"
            value={fighter.takedownAccuracy}
            onChange={(e) => onUpdate('takedownAccuracy', parseInt(e.target.value))}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`submission-${fighterNum}`}>Процент сабмишенов: {fighter.submissionRate}%</Label>
          <Input
            id={`submission-${fighterNum}`}
            type="range"
            min="0"
            max="100"
            value={fighter.submissionRate}
            onChange={(e) => onUpdate('submissionRate', parseInt(e.target.value))}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`ko-${fighterNum}`}>Процент нокаутов: {fighter.koRate}%</Label>
          <Input
            id={`ko-${fighterNum}`}
            type="range"
            min="0"
            max="100"
            value={fighter.koRate}
            onChange={(e) => onUpdate('koRate', parseInt(e.target.value))}
            className="cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label htmlFor={`age-${fighterNum}`}>Возраст</Label>
            <Input
              id={`age-${fighterNum}`}
              type="number"
              value={fighter.age}
              onChange={(e) => onUpdate('age', parseInt(e.target.value) || 25)}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`reach-${fighterNum}`}>Размах (см)</Label>
            <Input
              id={`reach-${fighterNum}`}
              type="number"
              value={fighter.reach}
              onChange={(e) => onUpdate('reach', parseInt(e.target.value) || 180)}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`weight-${fighterNum}`}>Вес (кг)</Label>
            <Input
              id={`weight-${fighterNum}`}
              type="number"
              value={fighter.weight}
              onChange={(e) => onUpdate('weight', parseInt(e.target.value) || 70)}
              className="bg-input border-border"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FighterCard;
