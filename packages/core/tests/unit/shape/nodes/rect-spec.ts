import Graph from '../../implement-graph';
import '../../../../src/element/node';
import '../../../../src/element/nodes';

const div = document.createElement('div');
document.body.appendChild(div);

describe('rect test', () => {
  describe('default rect test', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'simple-rect',
      },
    };
    const graph = new Graph(cfg);
    it('default rect config', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            x: 100,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toEqual(100);
      expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
      expect(keyShape.attr('fill')).toEqual('rgb(239, 244, 255)');
    });

    it('rect with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'simple-rect',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toBe(undefined);
      expect(label.attr('fill')).toEqual('#000');
      const type = label.get('type');
      expect(type).toEqual('text');
      // graph.destroy();
      // expect(graph.destroyed).toBe(true);
    });
  });

  describe('update', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    it('update styles', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'simple-rect',
          size: 50,
          style: {
            fill: 'red',
            stroke: '#ccc',
            lineWidth: 5,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'simple-rect',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      node.update({
        size: 30,
        color: 'black',
        style: {
          fill: 'steelblue',
        },
      });
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toBe(30);
      expect(keyShape.attr('height')).toBe(30);
      expect(keyShape.attr('fill')).toBe('steelblue');
      expect(keyShape.attr('lineWidth')).toBe(5);

      // graph.destroy();
      // expect(graph.destroyed).toBe(true);
    });
    it('update label', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old rect label',
            type: 'simple-rect',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // TODO: label并没有更新
      node.update({
        label: 'new rect label',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('#ff0');

      // test if it will keep the current fill without setting
      node.update({
        labelCfg: {
          position: 'center',
          style: {
            stroke: 'black',
            lineWidth: 3,
          },
        },
      });
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('#ff0');
      expect(label.attr('stroke')).toEqual('black');
      expect(label.attr('lineWidth')).toEqual(3);

      // graph.destroy();
      // expect(graph.destroyed).toBe(true);
    });
    it('update label from none', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      const graph = new Graph({
        // TODO: 这里设置autoPaint为false，顺序正常，比较迷惑
        autoPaint: false,
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            type: 'simple-rect',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      node.update({
        label: 'new rect label',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('#ff0');

      // graph.destroy();
      // expect(graph.destroyed).toBe(true);
    });
  });
});